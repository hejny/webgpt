import parse from 'html-react-parser';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useSsrDetection } from '../../utils/hooks/useSsrDetection';
import { string_css_class, string_href, string_html } from '../../utils/typeAliases';
import { extractFontsFromContent } from '../ImportFonts/extractFontsFromContent';
import { mapLinksInHtml } from './mapLinksInHtml';

interface HtmlContentProps {
    /**
     * Source html
     */
    content: string_html;

    /**
     * Optional CSS class name which will be added to root element
     */
    className?: string_css_class;

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
    const { className, isEditable, mapLinks, onHtmlChange } = props;

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
                <div {...{ className }}>{children}</div>
            </>
        );
    }

    return <HtmlContentEditable {...{ content, className, onHtmlChange }} />;
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

        console.log('!!! is active', element === document.activeElement);
        if (element.dataset.contentState === 'react-render' || element !== document.activeElement) {
            element.innerHTML = content /* <- Here [3] */;
            element.dataset.contentState = 'filled';
        }

        /*
        TODO: [🧠] Here shuld be some inteligent react-like virtual dom diffing to avoid re-rendering when content is not changed
                BUT applying all the external changes to the content
        if (element.innerHTML !== content) {
            element.innerHTML = content ;
        }
        */
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
        <div {...{ className }} ref={elementRef} data-content-state={'react-render'}>
            This will be never shown because it is immediatelly replaced here [3] in useLayoutEffect
        </div>
    );
}

/**
 * TODO: [👼] Components <HtmlContent/>, <MarkdownContent/> and <Content> are coupled together more then they should be
 * TODO: [🧠][💬] Allow to change fonts and do rich text editing
 * TODO: [👩‍🦰] Allow to change fonts in <WallpaperContentSection/> or <Content/> or <HtmlContent/>
 * TODO: [👨‍🦰] Show editable hint in <WallpaperContentSection/> or <Content/> or <HtmlContent/> (<- <HtmlContentEditable/>)
 * TODO: [🕶] Is `element !== document.activeElement` good enough? Isnt document.activeElement sometimes child of element?
 */
