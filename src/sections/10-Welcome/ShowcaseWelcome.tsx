import { IWallpaperComponent } from '../../../assets/ai/wallpaper/IWallpaperComponent';
import { Article } from '../../components/Article/Article';
import { HandwrittenText } from '../../components/HandwrittenText/HandwrittenText';
import { Section } from '../../components/Section/Section';
import { skinFromWallpaper } from '../../utils/skinFromWallpaper';
import styles from './Welcome.module.css';

/**
 * @@@
 */
interface WelcomeProps {
    Wallpaper: IWallpaperComponent /* <- !!! DO not pass, just use */;
}

/**
 * @@@
 */
export function ShowcaseWelcomeSection(props: WelcomeProps) {
    const { Wallpaper } = props;
    const skin = skinFromWallpaper(Wallpaper); /* <- !!! DO not convert, just use */

    return (
        <Section id="Welcome" className={styles.WelcomeSection}>
            <h1 className={styles.handritten}>
                <HandwrittenText color={skin.highlightedTextColor}>{Wallpaper.texts.title}</HandwrittenText>
            </h1>

            <Article content={Wallpaper.texts.content} isEnhanced />
        </Section>
    );
}
