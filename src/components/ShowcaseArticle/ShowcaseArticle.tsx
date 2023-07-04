import { debounce } from 'lodash';
import { detectContentFormat } from '../../utils/content/detectContentFormat';
import { useMode } from '../../utils/hooks/useMode';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import { string_html } from '../../utils/typeAliases';
import { extractFontsFromContent } from '../Fonts/extractFontsFromContent';
import { Fonts } from '../Fonts/Fonts';
import { Html } from '../Html/Html';
import { Markdown } from '../Markdown/Markdown';
import { Section } from '../Section/Section';
import styles from './ShowcaseArticle.module.css';

/**
 * @@@
 */
export function ShowcaseArticleSection() {
    const { isPresenting } = useMode();
    const [{ content }, modifyWallpaper] = useWallpaper();

    const contentFormat = detectContentFormat(content);

    const isEditable = !isPresenting;
    const onHtmlChange = !isEditable
        ? undefined
        : debounce(async (newContent: string_html) => {
              modifyWallpaper((modifiedWallpaper) => {
                  modifiedWallpaper.content = newContent;
                  modifiedWallpaper.isSaved = false;
                  return modifiedWallpaper;
              });
          }, 50);

    return (
        <Section id="home" className={styles.Article}>
            {/*
            TODO: 
            <h1 className={styles.handritten}>
                <HandwrittenText color={skin.highlightedTextColor}>{wallpaper.title}</HandwrittenText>
            </h1>
            */}

            <Fonts fonts={extractFontsFromContent(content)} />

            {contentFormat === 'html' && <Html {...{ content, isEditable, onHtmlChange }} />}
            {contentFormat === 'markdown' && (
                <Markdown
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
 * TODO: !!! Name this showcaseContentSection
 * TODO: [🧬] !! Fake generating - write tokenized text
 * TODO: !! [👕] Allow to edit the header position + other things
 * TODO: !! This should be really named ShowcaseSection because it cointains mere then welcome
 * TODO: !! Allow html content
 * TODO: Allow templating systems
 */
