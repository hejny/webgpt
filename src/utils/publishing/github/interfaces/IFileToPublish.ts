/**
 * Represents a file to be published
 */
export interface IFileToPublish {
    path: string;
    content: string | Blob;
}
