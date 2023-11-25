import spaceTrim from 'spacetrim';
import { linkMaxdown } from '../../utils/content/linkMaxdown';
import { normalizeDashes } from '../../utils/content/normalizeDashes';
import { string_css_class, string_href, string_maxdown } from '../../utils/typeAliases';
import { HtmlContent } from './HtmlContent';
import { maxdownConverter } from './maxdownConverter';

interface MaxdownContentProps {


    /**
     * Source maxdown
     */
    content: string_maxdown;

    /**
     * Optional CSS class name which will be added to root element
     */
    className?: string_css_class;

        // TODO: !!! Less options

    /**
     * Are tags <!--font:Poppins--> detected and applied
     *
     * Note: When you use this you need to include the fonts into the page for example by using <Fonts/> component
     */
    isusingFonts?: boolean;

    /*
    TODO: [0] This is automatically done by showdown
    /**
     * Make for each heading in maxdown unique id and scroll to hash
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
     * If set, all <a href="..."> will be mapped by this function
     */
    mapLinks?(oldHref: string_href): string_href;

    /**
     * Callback when content is changed
     * returns back converted maxdown
     *
     * Note: This is used only when isEditable is true
     */
    onMaxdownChange?: (content: string_maxdown) => void;
}

/**
 * Renders given maxdown content with optional enhancements and optional editability
 *
 * Note: There are two similar components:
 * - <MarkdownContent/> which renders general markdown content with some enhancements without markdown-markdown editability
 * - <MaxdownContent/> which renders specific flavor of markdown content for WebGPT with markdown-markdown editability
 *
 * @param {IArticleProps} props - The props for the component
 * @returns {JSX.Element} - The JSX element for the article
 */
export function MaxdownContent(props: MaxdownContentProps) {
    const {
        content,
        className,
        isusingFonts /* [0], isHashUsed */,
        isUsingOpenmoji,
        isEnhanced,
        isEditable,
        mapLinks,
        onMaxdownChange,
        onHtmlChange,
    } = props;

    // [0] const hash = useHash();

    let synchronouslyEnhancedContent: string_maxdown = spaceTrim(content || '');

    if (isEnhanced) {
        synchronouslyEnhancedContent = linkMaxdown(synchronouslyEnhancedContent);
        synchronouslyEnhancedContent = normalizeDashes(synchronouslyEnhancedContent);
    }

    /*/
    const enhancedContentSubject = useMemo(
        () => {
            const enhancedContentSubject = new BehaviorSubject(synchronouslyEnhancedContent);
            if (isUsingOpenmoji) {
                (async () => {
                    enhancedContentSubject.next(
                        await emojifyMaxdown(
                            enhancedContentSubject.value,
                            'color' /* TODO: [🎲] 'var(--palette-1)' * /,
                        ),
                    );
                })();
            }
            return enhancedContentSubject;
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [content, isUsingOpenmoji],
    );

    const { value: enhancedContent } = useObservable(enhancedContentSubject);
    /**/
    /**/
    // Note: Temporarlly disabled because of enoromous number of javascript assets because of OpenMoji
    // TODO: [🧥] Figure out how to use OpenMoji efficiently - maybe when there will be ready to use OpenMoji font
    const enhancedContent = synchronouslyEnhancedContent;
    /**/

    let html = maxdownConverter.makeHtml(enhancedContent);

    if (isusingFonts) {
        html = html.replace(
            // TODO: [🔤] DRY
            /<!--font:(.*?)-->/g,

            // Note: [💅] Originally here was '$1' but it was changed just to $1 (unquoted)
            //       There is some problem with escaping in export:
            //       - <div style="font-family:&#x27;Barlow Condensed&#x27;, sans-serif">
            `</div><div style="font-family: $1, sans-serif;">` /* <- TODO: Do not hardcode sans-serif */ /* <- [🎗] */,
        );
        // TODO: Teoretically, the line below should be used BUT it does not work with it and strangely works without it:
        // synchronouslyEnhancedContent = `<div>\n\n\n${synchronouslyEnhancedContent}\n\n\n</div>` /* <- TODO: This is a bit hack how to process easily non-ended font tags  */;
    }

    html = html.split(/<p>\s*<\/p>/g).join('');

    if (html === '') {
        // Note: Do not make empty div for empty article
        return <></>;
    }

    // TODO: [0] If not using hash, remove IDs from html
    // [0] const currentSubsection = hash.substring(1);

    return (
        <>
            <HtmlContent
                {...{ content: html, isEditable, mapLinks, className }}
                onHtmlChange={(htmlContent) => {
                    if (!isEditable) {
                        return;
                    }

                    if (onHtmlChange) {
                        onHtmlChange(htmlContent);
                    }

                    if (onMaxdownChange) {
                        const maxdownContent = maxdownConverter.makeMaxdown(htmlContent);

                        console.log('!!!', { htmlContent, maxdownContent });

                        onMaxdownChange(maxdownContent);
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
 * TODO: [👼] Components <HtmlContent/>, <MaxdownContent/> and <Content> are coupled together more then they should be
 * TODO: [0] Use has if isHashUsed is true
 * TODO: Maybe rename to <Content/> or <MaxdownContent/> or <Maxdown/>
 * TODO: [0] Make has work + rename hash to fragment ACRY
 */
