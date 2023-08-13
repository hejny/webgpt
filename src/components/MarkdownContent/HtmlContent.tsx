import parse from 'html-react-parser';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useSsrDetection } from '../../utils/hooks/useSsrDetection';
import { string_href, string_html } from '../../utils/typeAliases';
import { extractFontsFromContent } from '../ImportFonts/extractFontsFromContent';
import { ImportFonts } from '../ImportFonts/ImportFonts';
import { mapLinksInHtml } from './mapLinksInHtml';

/**
 * A function component that renders a div element with parsed HTML content ⁘
 *
 * @param {HtmlContentProps} props - The props for the component.
 * @returns {JSX.Element} A div element with parsed HTML content and optional CSS class name.
 */
interface HtmlContentProps {
    /**
     * Source html
     */
    content: string_html;

    /**
     * Optional CSS class name
     */
    className?: string_css_class;

    /**
     * Is editable by user
     */
    isEditable?: boolean;

    /**
     * Import used fonts which are inlined in html
     */
    isUsedFontsImported?: boolean;

    /**
     * If set, all <a href="..."> will be mapped by this function
     */
    mapLinks?(oldHref: string_href): string_href;

    /**
     * Callback when content is changed
     *
     * Note: This is used only when isEditable is true
     */
    onHtmlChange?: (content: string_html) => void;
}

/**
 * Renders given html content with optional editability
 */
export function HtmlContent(props: HtmlContentProps) {
    let { content } = props;
    const { className, isEditable, isUsedFontsImported, mapLinks, onHtmlChange } = props;

    if (mapLinks) {
        content = mapLinksInHtml(content, mapLinks);
    }

    const isServerRender = useSsrDetection();
    const fonts = extractFontsFromContent(content);

    if (!isEditable || isServerRender) {
        const children =
            parse(
                content,
            ); /* <- Note: Using html-react-parser (not dangerouslySetInnerHTML) to avoid react hydration errors */

        return (
            <>
                {isUsedFontsImported && <ImportFonts {...{ fonts }} />}
                <div {...{ className }}>{children}</div>
            </>
        );
    }

    return (
        <>
            {isUsedFontsImported && <ImportFonts {...{ fonts }} />}
            <HtmlContentEditable {...{ content, className, onHtmlChange }} />
        </>
    );
}

/**
 * Renders given html as editable content
 *
 * @private
 */
function HtmlContentEditable(props: Omit<HtmlContentProps, 'isEditable'>) {
    const { content, className, onHtmlChange } = props;

    // Note: Using useEffect (instead of direct attributes) to keep focus during typing
    const elementRef = useRef<HTMLDivElement | null>(null);
    useLayoutEffect(() => {
        const element = elementRef.current;

        if (!element) {
            return;
        }

        if (element.innerHTML !== content) {
            element.innerHTML = content /* <- Here [3] */;
        }
    }, [content]);
    useEffect(() => {
        const element = elementRef.current;

        if (!element || !onHtmlChange) {
            return;
        }

        element.setAttribute('contentEditable', 'true');
        element.setAttribute('spellCheck', 'false');

        const inputHandler = (event: Event) => {
            const htmlContent = (event.currentTarget as HTMLDivElement).innerHTML as string_html;

            onHtmlChange(htmlContent);
        };
        element.addEventListener('input', inputHandler);

        return () => {
            element.removeEventListener('input', inputHandler);
        };
    }, [content, onHtmlChange, elementRef]);

    return (
        <div {...{ className }} ref={elementRef}>
            This will be never shown because it is immediatelly replaced here [3] in useLayoutEffect
        </div>
    );
}

/**
 * TODO: [👼] Components <HtmlContent/>, <MarkdownContent/> and <Content> are coupled together more then they should be
 * TODO: [🧠][💬] Allow to change fonts and do rich text editing
 */
