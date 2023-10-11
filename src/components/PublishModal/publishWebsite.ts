import spaceTrim from 'spacetrim';
import { IS_VERIFIED_EMAIL_REQUIRED, NEXT_PUBLIC_URL } from '../../../config';
import { exportAsZip } from '../../export/exportAsZip';
import { PublishWebsiteResponse } from '../../pages/api/publish';
import { IWallpaper } from '../../utils/IWallpaper';
import { getSupabaseForBrowser } from '../../utils/supabase/getSupabaseForBrowser';
import { provideClientId } from '../../utils/supabase/provideClientId';
import { string_domain, string_email } from '../../utils/typeAliases';
import { isValidDomain } from '../../utils/validators/isValidDomain';
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
        alert(`Please enter valid domain name`);
        return;
    }

    if (!isValidEmail(email)) {
        alert(`Please enter valid email address`);
        return;
    }

    const loadingUrl = new URL(NEXT_PUBLIC_URL);
    loadingUrl.pathname = '/publish-loading';
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

    const response1 /* <-[💩] */ = await fetch('/api/publish', {
        method: 'POST',
        body: formData,
    });

    if (response1.ok === false) {
        const { message } = (await response1.json()) as any; /* <-[🌋]  */
        throw new Error(
            spaceTrim(`
                Upload wallpaper failed with status ${response1.status}

                ${message}
            `),
        );
    }

    const { websiteUrl } = (await response1.json()) as PublishWebsiteResponse;

    console.info('🌍', { websiteUrl });
}
