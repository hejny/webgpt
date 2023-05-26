/**
 * Converts Blob to File
 * This is usefull for:
 *   - Preserving Files that actually has a filename
 *   - Autocomplete the filename for blobs according to its mimetype
 *
 *
 * @collboard-modules-sdk
 */
export async function blobToFile(blob: File | Blob, filename: string): Promise<File> {
    if (blob instanceof File) {
        return blob;
    }

    return new File([blob], filename, { type: blob.type });
}
