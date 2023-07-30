import { useMode } from '../../utils/hooks/useMode';
import { usePageName } from '../../utils/hooks/usePageName';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import { string_html } from '../../utils/typeAliases';
import { activateGalleryComponent } from '../ai-components/activateGalleryComponent';
import { AiComponentsRoot } from '../AiComponentsRoot/AiComponentsRoot';
import { ExportCommentedBlock } from '../ExportComment/ExportCommentedBlock';
import { extractFontsFromContent } from '../Fonts/extractFontsFromContent';
import { Fonts } from '../Fonts/Fonts';
import { Content } from '../MarkdownContent/Content';
import { Section } from '../Section/Section';
import { getPageContent } from './getPageContent';
import styles from './ShowcaseArticle.module.css';

/**
 * @@@
 */
export function ShowcaseArticleSection() {
    const { isEditable } = useMode();
    const [{ content }, modifyWallpaper] = useWallpaper();
    const pageName = usePageName();

    if (pageName !== 'index') {
        const pageContent = getPageContent(pageName);

        // TODO: !!!! Add back button to pageContent
        return (
            <Section id="home" className={styles.Article}>
                <Fonts
                    fonts={extractFontsFromContent(pageContent)}
                    // TODO: !!!! Fonts for pages
                />

                <AiComponentsRoot usedComponents={{ gallery: activateGalleryComponent }}>
                    <ExportCommentedBlock name="Content">
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

            <Fonts fonts={extractFontsFromContent(content)} />

            <AiComponentsRoot usedComponents={{ gallery: activateGalleryComponent }}>
                <ExportCommentedBlock name="Content">
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
 * TODO: isHashUsed + test it and put into menu + some way to return existing hashes
 * TODO: [🎐] Some markdown can not be converted back from html - use fallback to pure html content
 * TODO: !!! Name this showcaseContentSection
 * TODO: [🧬] !! Fake generating - write tokenized text
 * TODO: !! [👕] Allow to edit the header position + other things
 * TODO: !! This should be really named ShowcaseSection because it cointains mere then welcome
 * TODO: !! Allow html content
 * TODO: Allow templating systems
 */
