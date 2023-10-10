import { useRouter } from 'next/router';
import { useState } from 'react';
import { classNames } from '../../utils/classNames';
import { useCurrentWallpaper } from '../../utils/hooks/useCurrentWallpaper';
import { string_email } from '../../utils/typeAliases';
import { isValidUrl } from '../../utils/validators/isValidUrl';
import { MarkdownContent } from '../MarkdownContent/MarkdownContent';
import { Modal } from '../Modal/00-Modal';
import { PricingPlan, PricingPlans } from '../PricingTable/plans';
import { Select } from '../Select/Select';
import stylesForSelect from '../Select/Select.module.css';
import { WallpaperLink } from '../WallpaperLink/WallpaperLink';
import styles from './ExportModal.module.css';
import { exportWebsite } from './exportWebsite';

export const ExportSystem = {
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

/**
 * Renders the main export modal
 */
export function ExportModal() {
    const router = useRouter();
    const [wallpaper] = useCurrentWallpaper();
    const [publicUrl, setPublicUrl] = useState<null | URL>(null);
    const [email, setEmail] = useState<string_email>('');
    // const [projectName, setProjectName] = useState<string>('');
    const [system, setSystem] = useState<keyof typeof ExportSystem>('STATIC');
    const [plan, setPlan] = useState<PricingPlan>('SIMPLE');
    const [isHelpNeeded, setHelpNeeded] = useState<boolean>(false);

    return (
        <Modal title={'Get the web'} isCloseable>
            <form
                className={styles.settings}
                onSubmit={async (event) => {
                    event.preventDefault();

                    if (publicUrl === null) {
                        alert(`Please enter the website url`);
                        return;
                    }

                    await exportWebsite({
                        wallpaper,
                        publicUrl,
                        email,
                        system,
                        plan,
                        isHelpNeeded,
                    });
                    // TODO: [🧭] Reset form
                }}
            >
                <label className={styles.setting}>
                    <div className={styles.key}>Site url:</div>
                    <input
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
                        options={PricingPlans}
                        visibleButtons={Infinity}
                    />

                    <WallpaperLink
                        page="pricing"
                        /* Note: Keeping prefetch because we want to be this as-fast-as-possible */ target={'_blank'}
                        className={styles.extra}
                    >
                        More info about plans
                    </WallpaperLink>
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
                        <MarkdownContent content="Get the web 🚀" isUsingOpenmoji />
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
 * TODO: Registration should return some token which will be put into export
 * TODO: Each build should have unique id + build metadata (like date, aiai version, etc.)
 */
