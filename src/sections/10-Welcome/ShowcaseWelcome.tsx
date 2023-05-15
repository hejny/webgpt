import { Article } from '../../components/Article/Article';
import { Section } from '../../components/Section/Section';
import { useSkin } from '../../utils/hooks/useSkin';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import styles from './Welcome.module.css';

/**
 * @@@
 */
export function ShowcaseWelcomeSection() {
    const wallpaper = useWallpaper();
    const skin = useSkin();

    return (
        <Section id="Welcome" className={styles.WelcomeSection}>
            {/*
            <h1 className={styles.handritten}>
                <HandwrittenText color={skin.highlightedTextColor}>{wallpaper.title}</HandwrittenText>
            </h1>
            */}

            <div
                style={{
                    fontFamily: `'${wallpaper.font}', sans-serif` /* <- Use only in one place OR link by tag */,
                }}
                onClick={(event) => {
                    (event.target as HTMLDivElement).setAttribute('contenteditable', 'true');
                    (event.target as HTMLDivElement).setAttribute('spellcheck', 'false');
                    // TODO: !!! Also save the changes after editing
                }}
            >
                <Article content={wallpaper.content} />
            </div>
        </Section>
    );
}

/**
 * TODO: !! [👕] Allow to edit the header position + other things
 * TODO: !! This should be really named ShowcaseSection because it cointains mere then welcome
 */
