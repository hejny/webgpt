import { forTime } from 'waitasecond';
import { NEXT_PUBLIC_URL } from '../../../config';

/**
 * Emulates publishing website to domain
 */
export async function publishWebsiteMocked(options: any) {
    const alreadyPublishedDomain = 'owly.webgpt.cz'; /* <- TODO: Maybe put into config SAMPLE_DOMAINS */

    const loadingUrl = new URL(NEXT_PUBLIC_URL);
    loadingUrl.pathname = '/publish-loading';
    loadingUrl.searchParams.set('domain', alreadyPublishedDomain);
    window.open(loadingUrl.href, '_blank');

    await forTime(5000);
}
