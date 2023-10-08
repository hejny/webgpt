import { isRunningInNode } from '../../utils/isRunningInWhatever';
import { string_data_url } from '../../utils/typeAliases';

/**
 * Convert Blob or File to string data url
 * Tip: Consider using ObjectUrl class instead
 * Tip: You can pass dataurl and it will be returned as is
 */
export async function blobToDataurl(source: Blob | File): Promise<string_data_url> {
    if (isRunningInNode()) {
        let buffer = Buffer.from(await source.text());
        let base64 = buffer.toString('base64');
        return `data:${source.type};base64,${base64}`;
    }

    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener('load', async (event) => {
            const dataurl = event.target!.result as string;
            resolve(dataurl);
        });
        reader.readAsDataURL(source);
    });
}

/**
 * TODO: Throw warning when dataurl is not valid due to its length
 */
