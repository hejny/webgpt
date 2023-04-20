import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import csFlag from '../../../public/locale-flags/cs.svg';
import enFlag from '../../../public/locale-flags/en.svg';
import { classNames } from '../../utils/classNames';
import styles from './LanguagePicker.module.css';

export function LanguagePicker() {
    const router = useRouter();

    return (
        <div className={styles.LanguagePicker}>
            <div>
                <Link
                    href={router.pathname}
                    locale="en"
                    scroll={false}
                    className={classNames(styles.language, router.locale === 'en' && styles.current)}
                >
                    <Image src={enFlag} alt="Switch to English" title="🇺🇸 Switch to English" />
                </Link>

                <Link
                    href={router.pathname}
                    locale="cs"
                    scroll={false}
                    className={classNames(styles.language, router.locale === 'cs' && styles.current)}
                >
                    <Image src={csFlag} alt="Přepnout do Češtiny" title="🇨🇿 Přepnout do Češtiny" />
                </Link>
            </div>
        </div>
    );
}

/**
 * TODO: Probbably rename to <LanguageSwitcher (@see https://dev.to/adrai/static-html-export-with-i18n-compatibility-in-nextjs-8cd)
 */
