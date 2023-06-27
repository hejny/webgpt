import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { useState } from 'react';
import spaceTrim from 'spacetrim';
import { exportAsZip } from '../../export/exportAsZip';
import { induceFileDownload } from '../../export/utils/induceFileDownload';
import { classNames } from '../../utils/classNames';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import { getSupabaseForBrowser } from '../../utils/supabase/getSupabaseForBrowser';
import { string_email } from '../../utils/typeAliases';
import { Article } from '../Article/Article';
import { Modal } from '../Modal/Modal';
import { Select } from '../Select/Select';
import styles from './ExportModal.module.css';

interface ExportModalProps {}

const ExportSystem = {
    STATIC: 'Static',
    PHP: 'PHP',
    WORDPRESS: 'WordPress',
    OTHER: 'Other/Custom/Not sure',
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
    const wallpaper = useWallpaper();
    const [publicUrl, setPublicUrl] = useState<null | URL>(null);
    const [email, setEmail] = useState<string_email>('');
    // const [projectName, setProjectName] = useState<string>('');
    const [system, setSystem] = useState<keyof typeof ExportSystem>('OTHER');
    const [plan, setPlan] = useState<keyof typeof ExportPlan>('FREE');
    const [isHelpNeeded, setHelpNeeded] = useState<boolean>(false);

    return (
        <Modal title={'Get the web'}>
            <div className={styles.settings}>
                <label className={styles.setting}>
                    Your URL:&nbsp;&nbsp;
                    <input
                        className={styles.input}
                        defaultValue={publicUrl?.href || ''}
                        onChange={(e) => {
                            setPublicUrl(new URL(e.target.value));
                        }}
                        placeholder="https://www.your-awesome-project.com/"
                        type="text"
                    />
                    {/* * We need ... */}
                </label>
                <label className={styles.setting}>
                    Your Email:&nbsp;&nbsp;
                    <input
                        className={styles.input}
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
                    Company / project:&nbsp;&nbsp;
                    <input
                        className={styles.input}
                        defaultValue={projectName}
                        onChange={(e) => {
                            setProjectName(e.target.value);
                        }}
                        placeholder="Pineapple"
                    />
                </label>
                */}
                <label className={styles.setting}>
                    <Select
                        label="System:"
                        value={system}
                        onChange={(newSystem) => setSystem(newSystem)}
                        options={ExportSystem}
                        visibleButtons={Infinity}
                    />
                </label>
                <label className={styles.setting}>
                    <Select
                        label="Plan:"
                        value={plan}
                        onChange={(newPlan) => setPlan(newPlan)}
                        options={ExportPlan}
                        visibleButtons={Infinity}
                    />
                </label>

                <label className={styles.setting}>
                    <input
                        className={styles.input}
                        checked={isHelpNeeded}
                        onChange={(e) => {
                            setHelpNeeded(!isHelpNeeded);
                        }}
                        placeholder="john@smith.org"
                        type="checkbox"
                    />
                    I need help with setting up my website
                </label>

                <label className={styles.setting}>
                    <button
                        className={classNames('button', styles.button)}
                        disabled={publicUrl === null}
                        onClick={async () => {
                            if (!publicUrl) {
                                alert('Please enter your URL');
                                return;
                            }

                            const insertSiteResult = await getSupabaseForBrowser()
                                .from('Site')
                                .insert([
                                    {
                                        wallpaperId: wallpaper.id,
                                        url: publicUrl.href /* <- TODO: [🎞] Maybe do here some URL normalization */,
                                        ownerEmail: email,
                                        plan,
                                    },
                                ]);
                            console.info('⬆', { insertSiteResult });

                            if (isHelpNeeded || plan === 'ADVANCED' || plan === 'ENTERPRISE' || system !== 'STATIC') {
                                const insertSupportRequestResult = await getSupabaseForBrowser()
                                    .from('SupportRequest')
                                    .insert([
                                        {
                                            from: email,
                                            message: spaceTrim(`
                                                Hi,
                                                ${
                                                    isHelpNeeded
                                                        ? `I need help with setting up my website.`
                                                        : `I am interested in your ${plan} plan.`
                                                }

                                                My URL: ${publicUrl.href}
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
                        <Article content="Get the web 🚀" isUsingOpenmoji />
                    </button>
                </label>

                <pre style={{ display: 'none', width: 200, height: 200, overflow: 'scroll' }}>
                    {JSON.stringify(
                        { wallpaperId: wallpaper.id, publicUrl, email, system, plan, isHelpNeeded },
                        null,
                        4,
                    )}
                </pre>
            </div>
        </Modal>
    );
}

/**
 * TODO: !!! Design of export modal
 * TODO: Registration should return some token which will be put into export
 * TODO: Each build should have unique id + build metadata (like date, aiai version, etc.)
 */
