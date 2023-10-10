import spaceTrim from 'spacetrim';
import { IS_VERIFIED_EMAIL_REQUIRED } from '../../../config';
import { exportAsZip } from '../../export/exportAsZip';
import { induceFileDownload } from '../../export/utils/induceFileDownload';
import { IWallpaper } from '../../utils/IWallpaper';
import { getSupabaseForBrowser } from '../../utils/supabase/getSupabaseForBrowser';
import { provideClientId } from '../../utils/supabase/provideClientId';
import { string_email } from '../../utils/typeAliases';
import { PricingPlan } from '../PricingTable/plans';

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
     * User is not sure about URL
     */
    isUrlUnsure: boolean;

    /**
     * User nee
     */
    isHelpNeeded: boolean;

    /**
     * Wallpaper to publish
     */
    wallpaper: IWallpaper;
}

export async function exportWebsite(options: ExportWebsiteOptions) {
    const { publicUrl, email, system, plan,isUrlUnsure, isHelpNeeded, wallpaper } = options;

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

    if (isHelpNeeded || isUrlUnsure || plan === 'ADVANCED' || plan === 'ENTERPRISE' || system !== 'STATIC') {
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
                    My system: ${system}
                `),
                },
            ]);

        console.info('⬆', { insertSupportRequestResult });
    }

    /* not await */ induceFileDownload(await exportAsZip(wallpaper, { publicUrl }));
}
