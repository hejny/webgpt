import { useTranslation } from 'next-i18next';
import { Article } from '../../components/Article/Article';
import { HandwrittenText } from '../../components/HandwrittenText/HandwrittenText';
import { Section } from '../../components/Section/Section';
import { Color } from '../../utils/color/Color';
import { removeMarkdownFormatting } from '../../utils/content/removeMarkdownFormatting';
import { removeMarkdownLinks } from '../../utils/content/removeMarkdownLinks';
import styles from './Welcome.module.css';

/**
 * @@@
 */
export function HomepageWelcomeSection() {
    const { t, i18n } = useTranslation();
    // const skin = useSkin();

    return (
        <Section id="Welcome" className={styles.WelcomeSection}>
            <h1 className={styles.handritten}>
                <HandwrittenText color={/* skin.highlightedTextColor */ Color.get('white')}>
                    {removeMarkdownFormatting(removeMarkdownLinks(t('title')))}
                    {/* <- TODO: [🎎] Allow to have there full JSX with formatting like <Article content={t('title')} isEnhanced /> OR pass as markdown*/}
                </HandwrittenText>
            </h1>

            <Article content={t('Welcome.content')} isEnhanced />
        </Section>
    );
}
