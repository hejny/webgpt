import { useContext } from 'react';
import spaceTrim from 'spacetrim';
import { ExportContext } from '../../utils/hooks/ExportContext';
import { useMode } from '../../utils/hooks/useMode';
import { usePageName } from '../../utils/hooks/usePageName';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import { string_href, string_html } from '../../utils/typeAliases';
import { activateGalleryComponent } from '../AiComponents/activateGalleryComponent';
import { AiComponentsRoot } from '../AiComponents/AiComponentsRoot';
import { ExportCommentedBlock } from '../ExportComment/ExportCommentedBlock';
import { addFontToContent } from '../ImportFonts/addFontToContent';
import { extractFontsFromContent } from '../ImportFonts/extractFontsFromContent';
import { Content } from '../MarkdownContent/Content';
import { Section } from '../Section/Section';
import { getPageContent } from './getPageContent';
import styles from './WallpaperContent.module.css';

/**
 * @@@
 */
export function WallpaperContentSection() {
    const { isEditable } = useMode();
    const [{ content, title }, modifyWallpaper] = useWallpaper();
    const { isExported } = useContext(ExportContext);
    const pageName = usePageName();

    if (pageName !== 'index') {
        let pageContent = getPageContent(pageName);

        const mainContentFonts = extractFontsFromContent(content);
        const mainContentFont = Array.from(mainContentFonts)[1] || Array.from(mainContentFonts)[0]!;
        pageContent = spaceTrim(
            (block) => `

                ${block(pageContent)}

                <a href="/" class="button">Home</a>

            `,
        );
        pageContent = addFontToContent(pageContent, mainContentFont);
        pageContent = pageContent.split(`{TITLE}`).join(title);

        return (
            <Section className={styles.Article}>
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
                            mapLinks={(href: string_href) => {
                                if (isExported) {
                                    return href;
                                }

                                if (href.startsWith('#')) {
                                    return href;
                                }

                                if (href === '/' || href === '/index' || href === '/index.html' || href === '') {
                                    return '?';
                                }

                                return `?page=${href}`;
                            }}
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
        <Section className={styles.Article}>
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
 * TODO: [🧬] !! Fake generating - write tokenized text
 * TODO: !! [👕] Allow to edit the header position + other things
 * TODO: !! This should be really named WallpaperSection because it cointains mere then welcome
 * TODO: !! Allow html content
 * TODO: Allow templating systems
 */
