import spaceTrim from 'spacetrim';
import { useMode } from '../../utils/hooks/useMode';
import { usePageName } from '../../utils/hooks/usePageName';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import { string_html } from '../../utils/typeAliases';
import { activateGalleryComponent } from '../ai-components/activateGalleryComponent';
import { AiComponentsRoot } from '../AiComponentsRoot/AiComponentsRoot';
import { ExportCommentedBlock } from '../ExportComment/ExportCommentedBlock';
import { addFontToContent } from '../ImportFonts/addFontToContent';
import { extractFontsFromContent } from '../ImportFonts/extractFontsFromContent';
import { Content } from '../MarkdownContent/Content';
import { Section } from '../Section/Section';
import { getPageContent } from './getPageContent';
import styles from './ShowcaseArticle.module.css';

/**
 * @@@
 */
export function ShowcaseArticleSection() {
    const { isEditable } = useMode();
    const [{ content, title }, modifyWallpaper] = useWallpaper();
    const pageName = usePageName();

    if (pageName !== 'index') {
        let pageContent = getPageContent(pageName);

        const mainContentFonts = extractFontsFromContent(content);
        const mainContentFont = Array.from(mainContentFonts)[1] || Array.from(mainContentFonts)[0];
        pageContent = addFontToContent(pageContent, mainContentFont);
        pageContent = spaceTrim(
            (block) => `
           
                ${block(pageContent)}

                <a href="/" class="button">Home</a>

            `,
        );
        pageContent = pageContent.split(`{TITLE}`).join(title);

        return (
            <Section id="home" className={styles.Article}>
                <AiComponentsRoot usedComponents={{ gallery: activateGalleryComponent }}>
                    <ExportCommentedBlock
                        name="Content"
                        note={`
                            Following is the content of the side page:
                        `}
                    >
                        <Content
                            isusingFonts
                            isUsingOpenmoji={
                                false /* <- TODO: [🧠] Some better way how to use Openmoji with editable capability */
                            }
                            content={pageContent}
                        />
                    </ExportCommentedBlock>
                </AiComponentsRoot>
            </Section>
        );
    }

    const onHtmlChange = !isEditable
        ? undefined
        : async (newContent: string_html) => {
              modifyWallpaper((modifiedWallpaper) => {
                  modifiedWallpaper.content = newContent;
                  modifiedWallpaper.saveStage = 'EDITED';
                  return modifiedWallpaper;
              });
          };

    return (
        <Section id="home" className={styles.Article}>
            {/*
            TODO:
            <h1 className={styles.handritten}>
                <HandwrittenText color={skin.highlightedTextColor}>{wallpaper.title}</HandwrittenText>
            </h1>
            */}

            <AiComponentsRoot usedComponents={{ gallery: activateGalleryComponent }}>
                <ExportCommentedBlock
                    name="Content"
                    note={`
                        Following is the content of the main page: 
                    `}
                >
                    <Content
                        isusingFonts
                        isUsingOpenmoji={
                            false /* <- TODO: [🧠] Some better way how to use Openmoji with editable capability */
                        }
                        {...{ content, isEditable, onHtmlChange }}
                    />
                </ExportCommentedBlock>
            </AiComponentsRoot>
        </Section>
    );
}

/**
 * TODO: Maybe split header and content font
 * TODO: isHashUsed + test it and put into menu + some way to return existing hashes
 * TODO: [🎐] Some markdown can not be converted back from html - use fallback to pure html content
 * TODO: !!! Name this showcaseContentSection
 * TODO: [🧬] !! Fake generating - write tokenized text
 * TODO: !! [👕] Allow to edit the header position + other things
 * TODO: !! This should be really named ShowcaseSection because it cointains mere then welcome
 * TODO: !! Allow html content
 * TODO: Allow templating systems
 */
