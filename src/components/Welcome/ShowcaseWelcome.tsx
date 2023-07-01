import { Article } from '../../components/Article/Article';
import { Section } from '../../components/Section/Section';
import { useMode } from '../../utils/hooks/useMode';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import styles from './Welcome.module.css';

/**
 * @@@
 */
export function ShowcaseWelcomeSection() {
    const wallpaper = useWallpaper();

    const { isPresenting } = useMode();

    return (
        <Section id="Welcome" className={styles.WelcomeSection}>
            {/*
            <h1 className={styles.handritten}>
                <HandwrittenText color={skin.highlightedTextColor}>{wallpaper.title}</HandwrittenText>
            </h1>
            */}

            {isPresenting ? (
                <Article content={wallpaper.content} isusingFonts isUsingOpenmoji />
            ) : (
                // !!!! Immediatelly create new Wallaper from changes
                <div
                    contentEditable /* <- TODO: !!!! [🧠] <ArticleEditable/> + !!! [🧠] Rename <Article/> to <Markdown/> or <MarkdownContent/> */
                >
                    <Article content={wallpaper.content} isusingFonts isUsingOpenmoji />
                </div>
            )}
        </Section>
    );
}

/**
 * TODO: !!!! Name this showcaseContentSection
 * TODO: [🧬] !! Fake generating - write tokenized text
 * TODO: !! [👕] Allow to edit the header position + other things
 * TODO: !! This should be really named ShowcaseSection because it cointains mere then welcome
 * TODO: !! Allow html content
 * TODO: Allow templating systems
 */
