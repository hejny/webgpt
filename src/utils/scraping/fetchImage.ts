import { IS_VERIFIED_EMAIL_REQUIRED } from '../../../config';
import { isRunningInBrowser, isRunningInWebWorker } from '../isRunningInWhatever';
import { provideClientId } from '../supabase/provideClientId';
import { string_url_image } from '../typeAliases';

/**
 * Fetch image using proxy
 *
 * Note: This function is available ONLY in browser or web worker
 * @returns image as Blob
 */
export async function fetchImage(imageUrl: string_url_image): Promise<Blob> {
    if (!isRunningInBrowser() && !isRunningInWebWorker()) {
        throw new Error(`This function is available ONLY in browser or web worker`);
    }

    const response = await fetch(
        // TODO: [🌺][3] Make some wrapper for this apiClient to construct requests + parse them and handle errors

        `/api/scrape/scrape-image?clientId=${
            /* <- TODO: [⛹️‍♂️] Send clientId through headers */ await provideClientId({
                isVerifiedEmailRequired:
                    IS_VERIFIED_EMAIL_REQUIRED.CREATE /* <- TODO: Is it OK to assume create stage */,
            })
        }&url=${encodeURIComponent(imageUrl)}`,
    );

    return await response.blob();
}
