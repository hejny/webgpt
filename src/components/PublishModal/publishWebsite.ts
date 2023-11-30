import spaceTrim from 'spacetrim';
import { IS_VERIFIED_EMAIL_REQUIRED, NEXT_PUBLIC_URL } from '../../../config';
import { exportAsZip } from '../../export/exportAsZip';
import { PublishWebsiteResponse } from '../../pages/api/publish';
import { isValidDomain } from '../../utils/domains/isValidDomain';
import { IWallpaper } from '../../utils/IWallpaper';
import { getSupabaseForBrowser } from '../../utils/supabase/getSupabaseForBrowser';
import { provideClientId } from '../../utils/supabase/provideClientId';
import { string_domain, string_email } from '../../utils/typeAliases';
import { isValidEmail } from '../../utils/validators/isValidEmail';

interface PublishWebsiteOptions {
    /**
     * Domain name of website
     */
    domain: string_domain;

    /**
     * Email of website owner
     */
    email: string_email;

    /**
     * Wallpaper to publish
     */
    wallpaper: IWallpaper;
}

/**
 * Publishes website to domain
 */
export async function publishWebsite(options: PublishWebsiteOptions) {
    const { domain, email, wallpaper } = options;

    console.info(`📦 Publishing to ${domain}`);

    if (!isValidDomain(domain)) {
        throw new Error(`Please enter valid domain name`);
    }

    if (!isValidEmail(email)) {
        throw new Error(`Please enter valid email address`);
    }

    const loadingUrl = new URL(NEXT_PUBLIC_URL);
    loadingUrl.pathname = '/website-tablo';
    loadingUrl.searchParams.set('domain', domain);
    window.open(loadingUrl.href, '_blank');

    const publicUrl = new URL(`https://${domain}/`);

    const insertSiteResult = await getSupabaseForBrowser()
        .from('Site')
        .insert([
            {
                wallpaperId: wallpaper.id,
                url: publicUrl.href,
                ownerEmail: email,
                author: await provideClientId({
                    isVerifiedEmailRequired: IS_VERIFIED_EMAIL_REQUIRED.PUBLISH,
                }),
            },
        ]);
    console.info('⬆', { insertSiteResult });

    /* 
    TODO: [🧠] Do here some SupportRequest insert
    if (isHelpNeeded || isUrlUnsure || plan === 'ADVANCED' || plan === 'ENTERPRISE') {
        const insertSupportRequestResult = await getSupabaseForBrowser()
            .from('SupportRequest')
            .insert([
                {
                    from: email,
                    author: await provideClientId({
                        isVerifiedEmailRequired: IS_VERIFIED_EMAIL_REQUIRED.PUBLISH,
                    }),
                    message: spaceTrim(`
                        Hi,
                        ${
                            isHelpNeeded
                                ? `I need help with setting up my website.`
                                : `I am interested in your ${plan} plan.`
                        }
                        ${!isUrlUnsure ? `` : `I am not sure about my URL.`}

                        ${!publicUrl ? '' : `My URL: ${publicUrl.href}`}
                        My plan: ${plan}
                    `),
                },
            ]);

        console.info('⬆', { insertSupportRequestResult });
    }
    */

    // Note: [🛣] In ideal case, here should be tar file, but exportAsTar is not working in browser and strangely lags
    const zipBundle = await exportAsZip(wallpaper, { publicUrl });

    console.info('📦', { zipBundle });

    const formData = new FormData();
    formData.append('bundle', zipBundle);

    const response = await fetch('/api/publish', {
        method: 'POST',
        body: formData,
    });

    if (response.ok === false) {
        const { message } = (await response.json()) as any; /* <-[🌋]  */
        throw new Error(
            spaceTrim(`
                Upload wallpaper failed with status ${response.status}

                ${message}
            `),
        );
    }

    const { websiteUrl } = (await response.json()) as PublishWebsiteResponse;

    console.info('🌍', { websiteUrl });
}
