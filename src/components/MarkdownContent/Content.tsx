import { useMemo } from 'react';
import { detectContentFormat } from '../../utils/content/detectContentFormat';
import { string_html, string_markdown } from '../../utils/typeAliases';
import { HtmlContent } from './HtmlContent';
import { MarkdownContent } from './MarkdownContent';

interface IContentProps {
    /**
     * Source markdown
     */
    content: string_html | string_markdown;

    /**
     * Optional CSS class name
     */
    className?: string;

    /**
     * Are tags <!--font:Poppins--> detected and applied
     *
     * Note: This is only for markdown content
     * Note: When you use this you need to include the fonts into the page for example by using <Fonts/> component
     */
    isusingFonts?: boolean;

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
     *
     * Note: This is only for markdown content
     */
    isEditable?: boolean;

    /**
     * Callback when content is changed
     * returns back pure html
     *
     * Note: This is used only when isEditable is true
     */
    onHtmlChange?: (content: string_markdown) => void;
}

/**
 * Renders given html or markdown content with optional enhancements and optional editability
 *
 * @param {IArticleProps} props - The props for the component
 * @returns {JSX.Element} - The JSX element for the article
 */
export function Content(props: IContentProps) {
    const { content, className, isusingFonts, isUsingOpenmoji, isEnhanced, isEditable, onHtmlChange } = props;

    const contentFormat = useMemo(() => detectContentFormat(content), [content]);

    return (
        <>
        
            {contentFormat === 'html' && <HtmlContent {...{ content, className, isEditable, onHtmlChange }} />}
            {['markdown', 'text'].includes(contentFormat) && (
                <MarkdownContent
                    {...{ content, className, isEditable, isusingFonts, isUsingOpenmoji, isEnhanced, onHtmlChange }}
                />
            )}
        </>
    );
}
