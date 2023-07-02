import { Article } from '../../components/Article/Article';
import { Section } from '../../components/Section/Section';
import { detectContentFormat } from '../../utils/detectContentFormat';
import { useMode } from '../../utils/hooks/useMode';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import { string_html } from '../../utils/typeAliases';
import { Html } from '../Html/Html';
import styles from './Welcome.module.css';

/**
 * @@@
 */
export function ShowcaseWelcomeSection() {
    const wallpaper = useWallpaper();

    const { isPresenting } = useMode();

    const content = wallpaper.content;
    const contentFormat = detectContentFormat(content);

    const isEditable = !isPresenting;
    const onHtmlChange = (newContent: string_html) => {
        console.log('newContent', newContent);
        // TODO: !!! Debounce and create new (temporary) wallpaper
    };

    return (
        <Section id="Welcome" className={styles.WelcomeSection}>
            {/*
            TODO: 
            <h1 className={styles.handritten}>
                <HandwrittenText color={skin.highlightedTextColor}>{wallpaper.title}</HandwrittenText>
            </h1>
            */}
            {contentFormat}

            {contentFormat === 'html' && <Html {...{ content, isEditable, onHtmlChange }} />}
            {contentFormat === 'markdown' && (
                <Article
                    isusingFonts
                    isUsingOpenmoji={
                        false /* <- TODO: [🧠] Some better way how to use Openmoji with editable capability */
                    }
                    {...{ content, isEditable, onHtmlChange }}
                />
            )}
        </Section>
    );
}

/**
 * TODO: isHashUsed + test it and put into menu + some way to return existing hashes
 * TODO: [🎐] Some markdown can not be converted back from html - use fallback to pure html content
 * TODO: !!!! Name this showcaseContentSection
 * TODO: [🧬] !! Fake generating - write tokenized text
 * TODO: !! [👕] Allow to edit the header position + other things
 * TODO: !! This should be really named ShowcaseSection because it cointains mere then welcome
 * TODO: !! Allow html content
 * TODO: Allow templating systems
 */
