import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import csFlag from '../../../public/locale-flags/cs.svg';
import enFlag from '../../../public/locale-flags/en.svg';
import { classNames } from '../../utils/classNames';
import { useLocale } from '../../utils/hooks/useLocale';
import styles from './LanguagePicker.module.css';

/**
 * A component that allows the user to switch between languages
 *
 * @returns {JSX.Element} A div element with two links to change the locale.
 */
export function LanguagePicker() {
    const router = useRouter();
    const locale = useLocale();

    return (
        <div className={styles.LanguagePicker}>
            <div>
                <Link
                    href={router.pathname}
                    locale="en"
                    scroll={false}
                    className={classNames(styles.language, locale === 'en' && styles.current)}
                >
                    <Image src={enFlag} alt="Switch to English" title="🇺🇸 Switch to English" />
                </Link>

                <Link
                    href={router.pathname}
                    locale="cs"
                    scroll={false}
                    className={classNames(styles.language, locale === 'cs' && styles.current)}
                >
                    <Image src={csFlag} alt="Přepnout do Češtiny" title="🇨🇿 Přepnout do Češtiny" />
                </Link>
            </div>
        </div>
    );
}

/**
 * TODO: Check here that ONLY one instance of <LanguagePicker /> is rendered
 * TODO: [🧠] Use in wallpaper page and allow to pass into export
 * TODO: !! Probbably rename to <LocaleSwitcher (@see https://dev.to/adrai/static-html-export-with-i18n-compatibility-in-nextjs-8cd)
 */
