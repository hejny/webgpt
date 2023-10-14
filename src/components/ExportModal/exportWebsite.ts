import spaceTrim from 'spacetrim';
import { IS_VERIFIED_EMAIL_REQUIRED } from '../../../config';
import { exportAsZip } from '../../export/exportAsZip';
import { induceFileDownload } from '../../export/utils/induceFileDownload';
import { IWallpaper } from '../../utils/IWallpaper';
import { getSupabaseForBrowser } from '../../utils/supabase/getSupabaseForBrowser';
import { provideClientId } from '../../utils/supabase/provideClientId';
import { string_email } from '../../utils/typeAliases';
import { isValidEmail } from '../../utils/validators/isValidEmail';
import { PricingPlan } from '../PricingTable/plans';
import { ExportSystem } from './ExportModal';

interface ExportWebsiteOptions {
    /**
     * Root url of website
     */
    publicUrl: URL;

    /**
     * Email of website owner
     */
    email: string_email;

    /**
     * System to export
     */
    system: keyof typeof ExportSystem;

    /**
     * Plan to export
     */
    plan: PricingPlan;

    /**
     * User needs help with setting up website
     */
    isHelpNeeded: boolean;

    /**
     * Wallpaper to publish
     */
    wallpaper: IWallpaper;
}

/**
 * Exports website to zip and downloads it
 */
export async function exportWebsite(options: ExportWebsiteOptions) {
    const { publicUrl, email, system, plan, isHelpNeeded, wallpaper } = options;

    if (!isValidEmail(email)) {
        alert(`Please enter valid email address`);
        return;
    }

    const insertSiteResult = await getSupabaseForBrowser()
        .from('Site')
        .insert([
            {
                wallpaperId: wallpaper.id,
                url: (publicUrl || new URL(`https://webgpt.cz/${wallpaper.id}}`))
                    .href /* <- TODO: [🎞] Maybe do here some URL normalization */,
                ownerEmail: email,
                plan,
                author: await provideClientId({
                    isVerifiedEmailRequired: IS_VERIFIED_EMAIL_REQUIRED.PUBLISH,
                }),
            },
        ]);
    console.info('⬆', { insertSiteResult });

    if (isHelpNeeded || plan === 'ADVANCED' || plan === 'ENTERPRISE' || system !== 'STATIC') {
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

                    ${!publicUrl ? '' : `My URL: ${publicUrl.href}`}
                    My plan: ${plan.toString()}
                    My system: ${system.toString()}
                `),
                },
            ]);

        console.info('⬆', { insertSupportRequestResult });
    }

    /* not await */ induceFileDownload(await exportAsZip(wallpaper, { publicUrl }));
}
