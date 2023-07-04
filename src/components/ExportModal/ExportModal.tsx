import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import Link from 'next/link';
import { useState } from 'react';
import spaceTrim from 'spacetrim';
import { exportAsZip } from '../../export/exportAsZip';
import { induceFileDownload } from '../../export/utils/induceFileDownload';
import { classNames } from '../../utils/classNames';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import { getSupabaseForBrowser } from '../../utils/supabase/getSupabaseForBrowser';
import { provideClientId } from '../../utils/supabase/provideClientId';
import { string_email } from '../../utils/typeAliases';
import { isValidUrl } from '../../utils/validators/isValidUrl';
import { Markdown } from '../Markdown/Markdown';
import { Modal } from '../Modal/Modal';
import { Select } from '../Select/Select';
import stylesForSelect from '../Select/Select.module.css';
import styles from './ExportModal.module.css';

interface ExportModalProps {}

const ExportSystem = {
    STATIC: 'Static',

    WORDPRESS: 'WordPress',
    WIX: 'Wix',
    SQUARESPACE: 'Squarespace',
    WEBFLOW: 'Webflow',
    SHOPIFY: 'Shopify',

    PHP: 'PHP',
    NETTE: 'Nette',
    LARAVEL: 'Laravel',
    SYMFONY: 'Symfony',

    OTHER: '🤷 Other / Custom / Not sure',
} as const;

const ExportPlan = {
    FREE: 'Free',
    SIMPLE: 'Simple',
    ADVANCED: 'Advanced',
    ENTERPRISE: 'Enterprise',
} as const;

/**
 * @@
 */
export function ExportModal(props: ExportModalProps) {
    const [wallpaper] = useWallpaper();
    const [publicUrl, setPublicUrl] = useState<null | URL>(null);
    const [isUrlUnsure, setUrlUnsure] = useState<boolean>(false);
    const [email, setEmail] = useState<string_email>('');
    // const [projectName, setProjectName] = useState<string>('');
    const [system, setSystem] = useState<keyof typeof ExportSystem>('STATIC');
    const [plan, setPlan] = useState<keyof typeof ExportPlan>('SIMPLE');
    const [isHelpNeeded, setHelpNeeded] = useState<boolean>(false);

    const isFormComplete = Boolean((publicUrl !== null || isUrlUnsure) && email);

    return (
        <Modal title={'Get the web'}>
            <form
                className={styles.settings}
                onSubmit={async (event) => {
                    event.preventDefault();

                    const insertSiteResult = await getSupabaseForBrowser()
                        .from('Site')
                        .insert([
                            {
                                wallpaperId: wallpaper.id,
                                url: (publicUrl || new URL(`https://app.ai.hejny.org/${wallpaper.id}}`))
                                    .href /* <- TODO: [🎞] Maybe do here some URL normalization */,
                                ownerEmail: email,
                                plan,
                                author: provideClientId(),
                            },
                        ]);
                    console.info('⬆', { insertSiteResult });

                    if (
                        isHelpNeeded ||
                        isUrlUnsure ||
                        plan === 'ADVANCED' ||
                        plan === 'ENTERPRISE' ||
                        system !== 'STATIC'
                    ) {
                        const insertSupportRequestResult = await getSupabaseForBrowser()
                            .from('SupportRequest')
                            .insert([
                                {
                                    from: email,
                                    author: provideClientId(),
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

                    // TODO: Reset form
                }}
            >
                <label className={styles.setting}>
                    <div className={styles.key}>Site url:</div>
                    <input
                        className={classNames(styles.value, stylesForSelect.option)}
                        disabled={isUrlUnsure}
                        required={!isUrlUnsure}
                        defaultValue={publicUrl?.href || ''}
                        onChange={(e) => {
                            const value = e.target.value;

                            if (isValidUrl(value)) {
                                return;
                            }

                            setPublicUrl(new URL(value));
                        }}
                        placeholder="https://www.your-awesome-project.com/"
                        type="text"
                        title="Enter a valid website url like https://www.your-awesome-project.com/"
                        pattern="https?://.*"
                    />
                    {/* * We need ... */}

                    <label className={styles.extra}>
                        <input
                            className={classNames(styles.value, stylesForSelect.option)}
                            checked={isUrlUnsure}
                            onChange={(e) => {
                                setUrlUnsure(!isUrlUnsure);
                            }}
                            placeholder="john@smith.org"
                            type="checkbox"
                        />
                        I am not sure about the url
                    </label>
                </label>

                <label className={styles.setting}>
                    <div className={styles.key}>Your Email:</div>
                    <input
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
                <label className={styles.setting}>
                    <div className={styles.key}>System:</div>
                    <Select
                        className={styles.value}
                        label=""
                        value={system}
                        onChange={(newSystem) => setSystem(newSystem)}
                        options={ExportSystem}
                        visibleButtons={1}
                    />
                </label>
                <label className={styles.setting}>
                    <div className={styles.key}>Plan:</div>

                    <Select
                        className={styles.value}
                        label=""
                        value={plan}
                        onChange={(newPlan) => setPlan(newPlan)}
                        options={ExportPlan}
                        visibleButtons={Infinity}
                    />

                    <Link href="https://ai.hejny.org/pricing" target={'_blank'} className={styles.extra}>
                        More info about plans
                    </Link>
                </label>

                <label className={styles.setting}>
                    <input
                        className={classNames(styles.value, stylesForSelect.option)}
                        checked={isHelpNeeded}
                        onChange={(e) => {
                            setHelpNeeded(!isHelpNeeded);
                        }}
                        placeholder="john@smith.org"
                        type="checkbox"
                    />
                    I need help with setting up my website
                </label>

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
                        <Markdown content="Get the web 🚀" isUsingOpenmoji />
                    </button>
                </label>

                <pre style={{ display: 'none', width: 200, height: 200, overflow: 'scroll' }}>
                    {JSON.stringify(
                        { wallpaperId: wallpaper.id, publicUrl, email, system, plan, isHelpNeeded },
                        null,
                        4,
                    )}
                </pre>
            </form>
        </Modal>
    );
}

/**
 * TODO: !!! Design of export modal
 * TODO: Registration should return some token which will be put into export
 * TODO: Each build should have unique id + build metadata (like date, aiai version, etc.)
 */
