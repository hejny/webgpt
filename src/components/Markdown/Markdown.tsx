import { useContext, useMemo } from 'react';
import { BehaviorSubject } from 'rxjs';
import spaceTrim from 'spacetrim';
import { FONTS } from '../../../config';
import { ExportContext } from '../../pages/_app';
import { emojifyMarkdown } from '../../utils/content/emojifyMarkdown';
import { linkMarkdown } from '../../utils/content/linkMarkdown';
import { normalizeDashes } from '../../utils/content/normalizeDashes';
import { useObservable } from '../../utils/hooks/useObservable';
import { string_markdown } from '../../utils/typeAliases';
import { Html } from '../Html/Html';
import { markdownConverter } from './markdownConverter';

/**
 * Interface for article props ⁘
 *
 * @interface
 * @property {string} content - The content of the article in markdown format
 * @property {boolean} [isHashUsed] - Whether the article uses hash for navigation
 * @property {boolean} [isEnhanced] - Whether the article applies additional enhancements to the markdown
 */
interface IMarkdownProps {
    /**
     * Source markdown
     */
    content: string;

    /**
     * Optional CSS class name
     */
    className?: string;

    /**
     * Are tags <!--font:Poppins--> detected and applied
     */
    isusingFonts?: boolean;

    /* 
    TODO: [0] This is automatically done by showdown
    /**
     * Make for each heading in markdown unique id and scroll to hash
     * /
    isHashUsed?: boolean;
    */

    /**
     * Is enhanced by using openmoji
     */
    isUsingOpenmoji?: boolean;

    /**
     * Is enhanced by adding links, normalize dashes and emojify
     */
    isEnhanced?: boolean;

    /**
     * Is editable by user
     */
    isEditable?: boolean;

    /**
     * Callback when content is changed
     * returns back converted markdown
     *
     * Note: This is used only when isEditable is true
     */
    onMarkdownChange?: (content: string_markdown) => void;

    /**
     * Callback when content is changed
     * returns back pure html
     *
     * Note: This is used only when isEditable is true
     */
    onHtmlChange?: (content: string_markdown) => void;
}

/**
 * Function component that renders an article from markdown content ⁘
 *
 * @param {IArticleProps} props - The props for the component
 * @returns {JSX.Element} - The JSX element for the article
 */
export function Markdown(props: IMarkdownProps) {
    const {
        content,
        className,
        isusingFonts /* [0], isHashUsed */,
        isUsingOpenmoji,
        isEnhanced,
        isEditable,
        onMarkdownChange,
        onHtmlChange,
    } = props;
    const { isExported } = useContext(ExportContext);

    // [0] const hash = useHash();

    let synchronouslyEnhancedContent: string_markdown = spaceTrim(content || '');

    if (isusingFonts) {
        synchronouslyEnhancedContent = synchronouslyEnhancedContent.replace(
            /<!--font:(.*?)-->/g,
            `</div><div style="font-family: '$1', sans-serif;">` /* <- TODO: Do not hardcode sans-serif */ /* <- [🎗] */,
        );
        // TODO: Teoretically, the line below should be used BUT it does not work with it and strangely works without it:
        // synchronouslyEnhancedContent = `<div>\n\n\n${synchronouslyEnhancedContent}\n\n\n</div>` /* <- TODO: This is a bit hack how to process easily non-ended font tags  */;
    }

    if (isEnhanced) {
        synchronouslyEnhancedContent = linkMarkdown(synchronouslyEnhancedContent);
        synchronouslyEnhancedContent = normalizeDashes(synchronouslyEnhancedContent);
    }

    const enhancedContentSubject = useMemo(
        () => {
            const enhancedContentSubject = new BehaviorSubject(synchronouslyEnhancedContent);
            if (isUsingOpenmoji) {
                (async () => {
                    /*/
                    await forTime(1000);
                    enhancedContentSubject.next('2\n' + enhancedContentSubject.value);
                    await forTime(1000);
                    enhancedContentSubject.next('1\n' + enhancedContentSubject.value);
                    await forTime(1000);
                    /**/
                    /**/
                    enhancedContentSubject.next(
                        await emojifyMarkdown(
                            enhancedContentSubject.value,
                            'color' /* TODO: [🎲] 'var(--palette-1)' */,
                        ),
                    );
                    /**/
                })();
            }
            return enhancedContentSubject;
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [content, isUsingOpenmoji],
    );

    const { value: enhancedContent } = useObservable(enhancedContentSubject);

    const html = markdownConverter.makeHtml(enhancedContent);

    if (html === '') {
        // Note: Do not make empty div for empty article
        return <></>;
    }

    // TODO: [0] If not using hash, remove IDs from html
    // [0] const currentSubsection = hash.substring(1);

    return (
        <>
            {!isExported && isusingFonts && (
                <style
                    dangerouslySetInnerHTML={{
                        /* [🎗] */
                        __html: FONTS.filter((font) => html.includes(font))
                            .map(
                                (font) =>
                                    // TODO: Merge into one import
                                    `@import url(https://fonts.googleapis.com/css2?family=${font
                                        .split(' ')
                                        .join('+')}&display=swap);`,
                            )
                            .join('\n'),
                    }}
                />
            )}
            <Html
                className={className}
                {...{ content: html, isEditable }}
                onHtmlChange={(htmlContent) => {
                    if (!isEditable) {
                        return;
                    }

                    if (onHtmlChange) {
                        onHtmlChange(htmlContent);
                    }

                    if (onMarkdownChange) {
                        const markdownContent = markdownConverter.makeMarkdown(htmlContent);
                        onMarkdownChange(markdownContent);
                    }
                }}

                /*
                [0]
                ref={(element) => {
                    if (!element) {
                        return;
                    }

                    if (currentSubsection) {
                        const section = element.querySelector(`#${currentSubsection}`);

                        if (section) {
                            section.scrollIntoView(true);
                        }
                    }
                }}
                */
            />
            {/*
            TODO: <style> can not be in <div> because of AMP

            <style>
                 [0] !currentSubsection
                    ? ``
                    : `
                        #${currentSubsection}{
                          color: #1b73f7;
                        }

                        /*
                        TODO: Also all items to the next heading
                        #${currentSubsection} + * {
                          color: red;
                        }
                        * /

                `
            </style>
            */}
        </>
    );
}

/**
 * TODO: [0] Use has if isHashUsed is true
 * TODO: Maybe rename to <Content/> or <MarkdownContent/> or <Markdown/>
 * TODO: [0] Make has work + rename hash to fragment ACRY
 */
