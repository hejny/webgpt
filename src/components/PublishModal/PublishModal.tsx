import { useRouter } from 'next/router';
import { useState } from 'react';
import spaceTrim from 'spacetrim';
import { IS_VERIFIED_EMAIL_REQUIRED } from '../../../config';
import { exportAsZip } from '../../export/exportAsZip';
import { PublishWebsiteResponse } from '../../pages/api/publish';
import { classNames } from '../../utils/classNames';
import { useCurrentWallpaper } from '../../utils/hooks/useCurrentWallpaper';
import { getSupabaseForBrowser } from '../../utils/supabase/getSupabaseForBrowser';
import { provideClientId } from '../../utils/supabase/provideClientId';
import { string_email } from '../../utils/typeAliases';
import { isValidUrl } from '../../utils/validators/isValidUrl';
import { MarkdownContent } from '../MarkdownContent/MarkdownContent';
import { Modal } from '../Modal/00-Modal';
import stylesForSelect from '../Select/Select.module.css';
import { PublishText } from './PublishLink';
import styles from './PublishModal.module.css';

/**
 * Renders the main publish modal
 */
export function PublishModal() {
    const router = useRouter();
    const [wallpaper] = useCurrentWallpaper();
    const [publicUrl, setPublicUrl /* <- TODO: !!!! Change to domain NOT URL */ /* <- TODO: !!!! Offer the domain */] =
        useState<null | URL>(null);
    const [email, setEmail] = useState<string_email>('');

    const isFormComplete = Boolean(publicUrl !== null && email);

    return (
        <Modal title={<PublishText />} isCloseable>
            <form
                className={styles.settings}
                onSubmit={async (event) => {
                    event.preventDefault();

                    console.info(`📦 Publishing to ${publicUrl}`);

                    // TODO: !!!! Extract to separate publishWebsite function
                    // TODO: !!!! Do some new validation here
                    const insertSiteResult = await getSupabaseForBrowser()
                        .from('Site')
                        .insert([
                            {
                                wallpaperId: wallpaper.id,
                                url: (publicUrl || new URL(`https://webgpt.cz/${wallpaper.id}}`))
                                    .href /* <- TODO: [🎞] Maybe do here some URL normalization */,
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

                    // TODO: !!!! Wait until website is ready and fully deployed
                    // TODO: !!!! [🧠] Maybe do after publishing open new tab, show iframe,...
                    router.push(websiteUrl);
                }}
            >
                <label className={styles.setting}>
                    <div className={styles.key}>Site url:</div>
                    <input
                        // TODO: !!!! Allow URL, domain, subdomain, etc. - NEED of domain
                        // TODO: !!!! [🧠] Check (sub)domain availability
                        // TODO: !!!! [🧠] Information how to register domain + set CNAME
                        className={classNames(styles.value, stylesForSelect.option)}
                        required
                        defaultValue={publicUrl?.href || ''}
                        onChange={(e) => {
                            const value = e.target.value;

                            if (!isValidUrl(value)) {
                                return;
                            }

                            setPublicUrl(new URL(value));
                        }}
                        placeholder="https://www.your-awesome-project.com/"
                        type="text"
                        title="Enter a valid website url like https://www.your-awesome-project.com/"
                        pattern="https?://.*"
                    />
                </label>

                <label className={styles.setting}>
                    <div className={styles.key}>Your Email:</div>
                    <input
                        // TODO: !!!! Put here existing email
                        // TODO: !!!! Less visible + warning
                        className={classNames(styles.value, stylesForSelect.option)}
                        required
                        defaultValue={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        placeholder="john@smith.org"
                        type="email"
                    />
                </label>
                {/*
                <label className={styles.setting}>
                    <div className={styles.key}>Company / project:</div>
                    <input
                        className={classNames(styles.value, stylesForSelect.option)}
                        defaultValue={projectName}
                        onChange={(e) => {
                            setProjectName(e.target.value);
                        }}
                        placeholder="Pineapple"
                    />
                </label>
                */}

                <label className={classNames(styles.setting, styles.settingCentered)}>
                    <button
                        className={classNames('button', styles.getTheWeb)}
                        style={{
                            background: `url(${wallpaper.src})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                        // disabled={!isFormComplete}
                        type="submit"
                    >
                        <MarkdownContent content="Get the web 🚀" isUsingOpenmoji />
                    </button>
                </label>

                <pre style={{ display: 'nonex', width: 200, height: 200, overflow: 'scroll' }}>
                    {JSON.stringify({ wallpaperId: wallpaper.id, publicUrl, email }, null, 4)}
                </pre>
            </form>
        </Modal>
    );
}

/**
 * TODO: [🧠] Maybe allow here ask for support request
 * TODO: !!!! [🧠] Registration should return some token which will be put into publish
 * TODO: !!!! [🧠] Each build should have unique id + build metadata (like date, aiai version, etc.)
 */
