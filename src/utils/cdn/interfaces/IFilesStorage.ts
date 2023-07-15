import { IDestroyable } from 'destroyable';
import { IStorage } from 'everstorage';
import { string_mime_type } from '../../typeAliases';

export interface IFile {
    // Maybe TODO name: string;
    type: string_mime_type;
    data: Buffer;
}

/**
 * Represents storage that will store each keypair in a separate file.
 */
export interface IFilesStorage extends Omit<IStorage<IFile>, 'length' | 'clear' | 'key'> {
    subscribe(options: {
        match?: RegExp;
        isInitiallyReplayed?: boolean;
        observer(key: string, value: IFile): void;
    }): IDestroyable;
}

/**
 * Represents storage that can give public deterministic  URL for each file
 */
export interface IIFilesStorageWithCdn extends IFilesStorage {
    cdnPublicUrl: URL;
    getItemUrl(key: string): URL;
}

/**
 * TODO: Probably not deterministic and async getItemUrl
 * TODO: Probably just createUrlMaker
 * TODO: List method
 * TODO: Glob method
 * TODO: Subfolder (simmilar to PrefixStorage) method
 * TODO: Subscribe, list, sub(folder) should be part of LIB everstorage
 * TODO: Probably implement observe through RxJS
 */
