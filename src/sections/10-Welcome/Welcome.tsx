import { Passions_Conflict } from '@next/font/google';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import aiai from '../../../public/handwritten/aiai/aiai.svg';
import { Article } from '../../components/Article/Article';
import { Section } from '../../components/Section/Section';
import { classNames } from '../../utils/classNames';
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
                <h1 className={classNames(passionsConflictFont.className, styles.handritten)}>
                    {/* TODO: !!! Integrate https://www.calligrapher.ai/ on frontend (or at least at backend)  */}
                    {/* TODO: !!! One component */}
                    <Image alt={removeMarkdownFormatting(removeMarkdownLinks(t('title') || ''))} src={aiai} />
                    {/* <Article content={t('title')} isEnhanced /> */}
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
