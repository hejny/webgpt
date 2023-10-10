import { useRouter } from 'next/router';
import { useState } from 'react';
import { classNames } from '../../utils/classNames';
import { useCurrentWallpaper } from '../../utils/hooks/useCurrentWallpaper';
import { string_domain, string_email } from '../../utils/typeAliases';
import { MarkdownContent } from '../MarkdownContent/MarkdownContent';
import { Modal } from '../Modal/00-Modal';
import stylesForSelect from '../Select/Select.module.css';
import { PublishText } from './PublishLink';
import styles from './PublishModal.module.css';
import { publishWebsite } from './publishWebsite';
import { GetTheWebTabs } from './GetTheWebTabs';

/**
 * Renders the main publish modal
 */
export function PublishModal() {
    const router = useRouter();
    const [wallpaper] = useCurrentWallpaper();
    const [domain, setDomain] = useState<string_domain>(
        `${wallpaper.id /* <- TODO: !! Better domain to Offer */}.webgpt.cz`,
    );
    const [email, setEmail] = useState<string_email>('');

    return (
        <Modal title={<PublishText />} isCloseable>

            <GetTheWebTabs/>

            <form
                className={styles.settings}
                onSubmit={async (event) => {
                    event.preventDefault();
                    await publishWebsite({
                        wallpaper,
                        domain,
                        email,
                    });
                    // TODO: [🧭] Reset form
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
                        defaultValue={domain || ''}
                        onChange={(e) => {
                            const value = e.target.value;
                            setDomain(value);
                        }}
                        placeholder="your-awesome-project.webgpt.cz"
                        type="text"
                        title="Enter a domain name like your-awesome-project.com"
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
                        type="submit"
                    >
                        <MarkdownContent content="Get the web 🚀" isUsingOpenmoji />
                    </button>
                </label>

                <pre style={{ display: 'nonex', width: 200, height: 200, overflow: 'scroll' }}>
                    {JSON.stringify({ wallpaperId: wallpaper.id, domain, email }, null, 4)}
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
