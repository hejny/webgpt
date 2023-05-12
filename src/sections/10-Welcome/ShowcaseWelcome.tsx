import { Article } from '../../components/Article/Article';
import { HandwrittenText } from '../../components/HandwrittenText/HandwrittenText';
import { Section } from '../../components/Section/Section';
import { useSkin } from '../../utils/hooks/useSkin';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import styles from './Welcome.module.css';

/**
 * @@@
 */
export function ShowcaseWelcomeSection() {
    const Wallpaper = useWallpaper();
    const skin = useSkin();

    return (
        <Section id="Welcome" className={styles.WelcomeSection}>
            <h1 className={styles.handritten}>
                <HandwrittenText color={skin.highlightedTextColor}>{Wallpaper.texts.title}</HandwrittenText>
            </h1>

            <Article content={Wallpaper.texts.content} isEnhanced />
        </Section>
    );
}
