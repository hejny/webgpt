import { Promisable } from 'type-fest';
import { string_data_url } from '../../utils/typeAliases';

/**
 * Convert Blob or File to string data url
 * Tip: Consider using ObjectUrl class instead
 * Tip: You can pass dataurl and it will be returned as is
 */
export function blobToDataurl(source: Blob | File | string_data_url): Promisable<string_data_url> {
    if (typeof source === 'string') {
        // TODO: Probably check isValidUrl and if not throw error
        return source;
    } else if (source instanceof Blob) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener('load', async (event) => {
                const dataurl = event.target!.result as string;
                resolve(dataurl);
            });
            reader.readAsDataURL(source);
        });
    } else {
        throw new TypeError(`Can not convert ${typeof source} to data URL.`);
    }
}

/**
 * TODO: Throw warning when dataurl is not valid due to its length
 */
