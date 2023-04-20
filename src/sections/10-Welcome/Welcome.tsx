import { Passions_Conflict } from '@next/font/google';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import logoHandrittenEn from '../../../public/handwritten/all-en/from-0-to-1 (6).svg';
import { Article } from '../../components/Article/Article';
import { Section } from '../../components/Section/Section';
import { removeMarkdownFormatting } from '../../utils/content/removeMarkdownFormatting';
import { removeMarkdownLinks } from '../../utils/content/removeMarkdownLinks';
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
                    {i18n.language === 'en' && (
                        <Image
                            className={styles.logoHandritten}
                            alt={removeMarkdownFormatting(removeMarkdownLinks(t('title') || ''))}
                            src={logoHandrittenEn}
                        />
                        // TODO: !!! Pick the best one handwritten logo
                        // TODO: !!! All handwritten logos more thick
                        // TODO: !!! Glow around the handwritten logo
                        // TODO: !!! Handwritten logo mobile wrap / size
                        // TODO: !!! Logo CS should be also handwritten
                    )}

                    {i18n.language === 'cs' && <Article content={t('title')} isEnhanced />}
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
