import { isRunningInNode } from '../../utils/isRunningInWhatever';
import { blobToDataurl } from './blobToDataurl';

/**
 * Convert Blob or File to base64 string
 *
 * Note: This internally uses blobToDataurl (FileReader)
 *
 */
export async function blobToBase64(source: Blob | File): Promise<string> {
    if (isRunningInNode()) {
        let buffer = Buffer.from(await source.text());
        return buffer.toString('base64');
    }

    const dataurl = await blobToDataurl(source);
    const base64 = dataurl.split(',')[1]!;
    return base64;
}
