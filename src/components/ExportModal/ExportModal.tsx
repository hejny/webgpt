import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { useState } from 'react';
import { exportAsZip } from '../../export/exportAsZip';
import { induceFileDownload } from '../../export/utils/induceFileDownload';
import { classNames } from '../../utils/classNames';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import { getSupabaseForBrowser } from '../../utils/supabase/getSupabaseForBrowser';
import { string_email } from '../../utils/typeAliases';
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

    return (
        <Modal title={'Get the web'}>
            <div className={styles.settings}>
                <div className={styles.setting}>
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
                </div>
                <div className={styles.setting}>
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
                </div>
                {/*
                <div className={styles.setting}>
                    Company / project:&nbsp;&nbsp;
                    <input
                        className={styles.input}
                        defaultValue={projectName}
                        onChange={(e) => {
                            setProjectName(e.target.value);
                        }}
                        placeholder="Pineapple"
                    />
                </div>
                */}
                <div className={styles.setting}>
                    <Select
                        label="System:"
                        value={system}
                        onChange={(newSystem) => setSystem(newSystem)}
                        options={ExportSystem}
                        visibleButtons={Infinity}
                    />
                </div>
                <div className={styles.setting}>
                    <Select
                        label="Plan:"
                        value={plan}
                        onChange={(newPlan) => setPlan(newPlan)}
                        options={ExportPlan}
                        visibleButtons={Infinity}
                    />
                </div>

                <div className={styles.setting} style={{ display: 'none' }}>
                    <span>{publicUrl?.href}</span>
                    <span>{email}</span>
                    {/* <span>{projectName}</span> */}
                    <span>{system}</span>
                    <span>{plan}</span>
                </div>

                <div className={styles.setting}>
                    <button
                        className={classNames('button', styles.button, styles.buttonWithTwoLines)}
                        disabled={publicUrl === null}
                        onClick={async () => {
                            if (!publicUrl) {
                                alert('Please enter your URL');
                                return;
                            }

                            const wallpaperId = wallpaper.id;
                            const url = publicUrl.href; /* <- TODO: [🎞] Maybe do here some URL normalization */

                            await getSupabaseForBrowser()
                                .from('Site')
                                .insert([{ wallpaperId, url, ownerEmail: email, plan }]);

                            /*
                            !!!!!

                            await getSupabaseForBrowser()
                                .from('SupportRequest')
                                .insert([
                                    {
                                        from: email,
                                        message: spaceTrim(`

                                        
                                        `),
                                    },
                                ]);
                            */

                            /* not await */ induceFileDownload(await exportAsZip(wallpaper, { publicUrl }));
                        }}
                    >
                        <span className={styles.firstLine}>Deploy yourself</span>
                        <span className={styles.secondLine}>and download as .zip</span>
                    </button>

                    {/*
                    <button
                        // TODO: !!!!! Remove this button and replace by need help checkbox
                        className={classNames('button', styles.button, styles.buttonWithTwoLines)}
                        disabled={publicUrl === null}
                        onClick={async () => {
                            if (!publicUrl) {
                                alert('Please enter your URL');
                                return;
                            }

                            // TODO: !!! Make registration here

                            /* not await * / induceFileDownload(await exportAsZip(wallpaper, { publicUrl }));
                        }}
                    >
                        <span className={styles.firstLine}>Need help</span>
                        <span className={styles.secondLine}>and we will contact you</span>
                    </button>
                    */}
                </div>
            </div>
        </Modal>
    );
}

/**
 * TODO: !!! Design of export modal
 * TODO: Registration should return some token which will be put into export
 * TODO: Each build should have unique id + build metadata (like date, aiai version, etc.)
 */
