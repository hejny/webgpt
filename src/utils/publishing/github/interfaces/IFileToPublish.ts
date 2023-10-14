/**
 * Represents a file to be published
 */
export interface IFileToPublish {
    path: string;
    contentEncoding: 'utf-8' | 'base64';
    content: string;
}
