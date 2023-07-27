import {
    GetObjectCommand,
    ListObjectsV2Command,
    PutObjectCommand,
    PutObjectCommandInput,
    S3Client,
} from '@aws-sdk/client-s3';
import { IDestroyable, registerItemsInArray } from 'destroyable';
import { gzip, ungzip } from 'node-gzip';
import { IFile, IIFilesStorageWithCdn } from '../interfaces/IFilesStorage';

interface IDigitalOceanSpacesConfig {
    bucket: string;
    pathPrefix: string;
    endpoint: string;
    accessKeyId: string;
    secretAccessKey: string;
    cdnPublicUrl: URL;
    gzip: boolean;

    // TODO: [⛳️] Probbably prefix should be in this config not on the consumer side
}

export class DigitalOceanSpaces implements IIFilesStorageWithCdn {
    public get cdnPublicUrl() {
        return this.config.cdnPublicUrl;
    }

    private s3: S3Client;

    public constructor(private readonly config: IDigitalOceanSpacesConfig) {
        this.s3 = new S3Client({
            region: 'auto',
            endpoint: 'https://' + config.endpoint,
            credentials: {
                accessKeyId: config.accessKeyId,
                secretAccessKey: config.secretAccessKey,
            },
        });
    }

    public getItemUrl(key: string): URL {
        return new URL(this.config.pathPrefix + '/' + key, this.cdnPublicUrl);
    }

    public async getItem(key: string): Promise<IFile | null> {
        const parameters = {
            Bucket: this.config.bucket,
            Key: this.config.pathPrefix + '/' + key,
        };

        try {
            const { Body, ContentType, ContentEncoding } = await this.s3.send(new GetObjectCommand(parameters));

            // const blob = new Blob([await Body?.transformToByteArray()!]);

            if (ContentEncoding === 'gzip') {
                return {
                    type: ContentType!,
                    data: await ungzip(await Body?.transformToByteArray()!),
                };
            } else {
                return {
                    type: ContentType!,
                    data: (await Body?.transformToByteArray()!) as Buffer,
                };
            }
        } catch (error) {
            if (error instanceof Error && error.name.match(/^NoSuchKey/)) {
                return null;
            } else {
                throw error;
            }
        }
    }

    public async removeItem(key: string): Promise<void> {
        // TODO: !! implement
    }

    public async setItem(key: string, file: IFile): Promise<void> {
        // TODO: Put putObjectRequestAdditional into processedFile
        const putObjectRequestAdditional: Partial<PutObjectCommandInput> = {};

        let processedFile: IFile;
        if (this.config.gzip) {
            const gzipped = await gzip(file.data);
            const sizePercentageAfterCompression = gzipped.byteLength / file.data.byteLength;
            if (sizePercentageAfterCompression < 0.7) {
                // consolex.log(`Gzipping ${key} (${Math.floor(sizePercentageAfterCompression * 100)}%)`);
                processedFile = { ...file, data: gzipped };
                putObjectRequestAdditional.ContentEncoding = 'gzip';
            } else {
                processedFile = file;
                // consolex.log(`NOT Gzipping ${key} (${Math.floor(sizePercentageAfterCompression * 100)}%)`);
            }
        } else {
            processedFile = file;
        }

        const uploadResult = await this.s3.send(
            new PutObjectCommand({
                Bucket: this.config.bucket,
                Key: this.config.pathPrefix + '/' + key,
                ContentType: processedFile.type,
                ...putObjectRequestAdditional,
                Body: processedFile.data,
                // TODO: Public read access / just private to extending class
                ACL: 'public-read',
            }),
        );

        if (!uploadResult.ETag) {
            throw new Error(`Upload result does not contain ETag`);
        }

        await this.notifyObservers(key, file);
    }

    public subscribe({
        match,
        isInitiallyReplayed,
        observer,
    }: {
        match?: RegExp;
        isInitiallyReplayed?: boolean;
        observer(key: string, value: IFile): void;
    }): IDestroyable {
        if (isInitiallyReplayed) {
            const replay = async (ContinuationToken: string | undefined) => {
                // TODO: Probably it can be done with promisify and list only matching files - NOW there are listed all files

                const response = await this.s3.send(
                    new ListObjectsV2Command({
                        Bucket: this.config.bucket,
                        Prefix: 'modules' /* <- TODO: !!! Unhardcode and make from match */,
                        ContinuationToken,
                    }),
                );

                if (!response.Contents) {
                    return;
                }

                for (const file of response.Contents) {
                    if (file.Key) {
                        await this.notifyObservers(file.Key);
                    }
                }

                if (response.IsTruncated) {
                    /* not await */ replay(response.NextContinuationToken);
                }
            };

            /* not await */ replay(undefined);
        }

        return registerItemsInArray({ base: this.observers, add: [{ match, observer }] });
    }

    private observers: Array<{ match?: RegExp; observer(key: string, value: IFile): void }> = [];

    private async notifyObservers(key: string, file?: IFile) {
        for (const { match, observer } of this.observers) {
            if (!match || match.test(key)) {
                if (!file) {
                    const file2 = await this.getItem(key);
                    if (!file2) {
                        console.warn(`Already listed file ${key} not found.`);
                        return;
                    } else {
                        file = file2;
                    }
                }

                observer(key, file);
            }
        }
    }
}

/**
 * TODO: Read-only mode
 */
