import formidable from 'formidable';
import { readFile } from 'fs/promises';
import JSZip from 'jszip';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IFileToPublish } from '../../utils/publishing/github/interfaces/IFileToPublish';
import { publishToRepository } from '../../utils/publishing/github/publishToRepository';
import { randomJavascriptName } from '../../utils/randomJavascriptName';
import { string_url } from '../../utils/typeAliases';

export interface PublishWebsiteResponse {
    // TODO: [🌋] ErrorableResponse
    readonly websiteUrl: string_url;
}

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function publishWebsiteHandler(
    request: NextApiRequest,
    response: NextApiResponse<PublishWebsiteResponse>,
) {
    if (request.method !== 'POST') {
        return response.status(400).json({ message: 'Only POST method is allowed' } as any);
    }

    const files = await new Promise<formidable.Files>((resolve, reject) => {
        const form = formidable({});
        form.parse(request, (error, fields, files) => {
            if (error) {
                return reject(error);
            }
            return resolve(files);
        });
    });

    const bundlesArray = files.bundle;

    if (!bundlesArray || bundlesArray.length !== 1) {
        return response.status(400).json({ message: 'In form data there is not EXACTLY one "bundle" field' } as any);
    }

    const bundle = bundlesArray[0]!;

    if (!bundle.mimetype?.startsWith('application/zip')) {
        return response.status(400).json({ message: 'Only zip files are allowed' } as any);
    }

    try {
        const bundleBuffer = await readFile(bundle.filepath);
        const bundleZip = await JSZip.loadAsync(bundleBuffer);

        const files: Array<IFileToPublish> = await Promise.all(
            Object.entries(bundleZip.files)
                .filter(([path, { dir }]) => !dir)
                .map(async ([path, file]) => {
                    // TODO: !!! Simple function
                    return {
                        path,
                        content: await file.async('blob'),
                    };
                }),
        );

        /*
        Remove !!!
        console.log(`-----------------------`);
        console.log(bundleZip.files['build/']);
        console.log(`-----------------------`);
        console.log(
            '!!!',
            files.map(({ path }) => path),
        );
        */

        await publishToRepository({
            organizationName: '1-2i',
            repositoryName: randomJavascriptName({
                prefix: 'test-',
                length: 8,
            }) /* <- TODO: !!! [🧠] Utility to make unique repository names - maybe 1:1 with CNAME domain */,
            files,
            /*
            TODO: !!! Use and remove
            : [
                {
                    path: 'index.html',
                    content: `<h1>Welcome to ${'test'}!</h1>`,
                },
                {
                    path: 'CNAME',
                    content: `test.webgpt.cz`,
                },
            ],
            */
        });

        return response.status(201).json({
            websiteUrl: `https://test8.webgpt.cz/`,
        } satisfies PublishWebsiteResponse);
    } catch (error) {
        if (!(error instanceof Error)) {
            throw error;
        }

        console.error(error);
        return response.status(500).json({
            message: error.message /* <- TODO: [🈵] Is it good practise to reveal all error messages to client? */,
        } as any);
    }
}

/**
 * TODO: [🃏] Pass here some security token to prevent DDoS
 * TODO: [🧔] !! Check that uploaded website is not bigger that WEBSITE_MAX_ALLOWED_SIZE + check file size and aspect ratio
 * TODO: [🧠] Check website package integrity
 * TODO: [🧠] Check website package for malicious stuff
 */
