import { isRunningInBrowser } from 'openai/core';
import { blobToDataurl } from './blobToDataurl';

/**
 * Convert Blob or File to base64 string
 *
 * Note: This internally uses blobToDataurl (FileReader)
 *
 */
export async function blobToBase64(source: Blob | File): Promise<string> {
    if (isRunningInBrowser()) {
        const dataurl = await blobToDataurl(source);
        const base64 = dataurl.split(',')[1]!;
        return base64;
    } else {
        let buffer = Buffer.from(await source.text());
        return buffer.toString('base64');
    }
}
