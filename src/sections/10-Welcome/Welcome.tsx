import { Passions_Conflict } from '@next/font/google';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { Article } from '../../components/Article/Article';
import { Section } from '../../components/Section/Section';
import styles from './Welcome.module.css';

interface WelcomeProps {
    variant: 'HOMEPAGE' | 'SIDEPAGE' | 'PAVOLHEJNY';
}

const passionsConflictFont = Passions_Conflict({ weight: '400', style: 'normal', subsets: ['latin', 'latin-ext'] });

export function WelcomeSection(props: WelcomeProps) {
    const { variant } = props;

    const { t, i18n } = useTranslation();

    return (
        <Section id="Welcome" className={styles.WelcomeSection}>
            <Link href="/">
                <h1 className={passionsConflictFont.className}>
                    <Article content={t('title')} isEnhanced />
                </h1>
                {/* <- TODO: !!! This should be handwritten */}
            </Link>

            {variant === 'HOMEPAGE' && <Article content={t('Welcome.content')} isEnhanced />}

            {variant === 'SIDEPAGE' && (
                <Link className="button" href="/">
                    {t('Welcome.back-home')}
                </Link>
            )}
        </Section>
    );
}

/**
 * TODO: !!! Better utilize PAVOLHEJNY
 * TODO: Use somewhere <Acronym>Minimum viable product</Acronym>
 *     > Je lepší mít funkční MVP než mnoho měsíců-let pracovat kompletním vyladěném řešení https://youtu.be/4Z4EW9kSAX8
 * TODO: Maybe use <Shuffle> for technologies
 */
