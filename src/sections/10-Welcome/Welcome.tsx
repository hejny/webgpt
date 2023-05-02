import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { Article } from '../../components/Article/Article';
import { HandwrittenText } from '../../components/HandwrittenText/HandwrittenText';
import { Section } from '../../components/Section/Section';
import { removeMarkdownFormatting } from '../../utils/content/removeMarkdownFormatting';
import { removeMarkdownLinks } from '../../utils/content/removeMarkdownLinks';
import { useSkin } from '../../utils/hooks/useSkin';
import styles from './Welcome.module.css';

/**
 * An interface for the props of the WelcomeSection component ⁘
 *
 * @typedef {Object} WelcomeProps
 * @property {('HOMEPAGE' | 'SIDEPAGE' | 'PAVOLHEJNY')} variant - The variant of the welcome section
 */
interface WelcomeProps {
    variant: 'HOMEPAGE' | 'SIDEPAGE' | 'PAVOLHEJNY';
}

/**
 * A function component that renders a welcome section ⁘
 *
 * @param {WelcomeProps} props - The props for the component
 * @returns {JSX.Element} The welcome section element
 */
export function WelcomeSection(props: WelcomeProps) {
    const { variant } = props;

    const { t, i18n } = useTranslation();
    const skin = useSkin();

    const header =
        skin === null ? (
            <></>
        ) : (
            <h1 className={styles.handritten}>
                <HandwrittenText color={skin.highlightedTextColor}>
                    {removeMarkdownFormatting(removeMarkdownLinks(t('title')))}
                    {/* <- TODO: [🎎] Allow to have there full JSX with formatting like <Article content={t('title')} isEnhanced /> OR pass as markdown*/}
                </HandwrittenText>
            </h1>
        );

    return (
        <Section id="Welcome" className={styles.WelcomeSection}>
            {variant === 'HOMEPAGE' && header}
            {variant === 'SIDEPAGE' && <Link href="/">{header}</Link>}

            {variant === 'HOMEPAGE' && <Article content={t('Welcome.content')} isEnhanced />}

            {variant === 'SIDEPAGE' && (
                <Link className="button" href="/">
                    {t('Welcome.back-home')}
                </Link>
            )}
        </Section>
    );
}
