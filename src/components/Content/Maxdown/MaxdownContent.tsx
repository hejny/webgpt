import { string_css_class, string_maxdown } from '../../../utils/typeAliases';
import { HtmlContent } from '../HtmlContent';
import { htmlToMaxdown } from './htmlToMaxdown';
import { maxdownToHtml } from './maxdownToHtml';

interface MaxdownContentProps {
    /**
     * Source maxdown
     */
    content: string_maxdown;

    /**
     * Optional CSS class name which will be added to root element
     */
    className?: string_css_class;

    /**
     * Is editable by user
     */
    isEditable?: boolean;

    /**
     * Callback when content is changed
     * returns back converted maxdown
     *
     * Note: This is used only when isEditable is true
     */
    onMaxdownChange?: (content: string_maxdown) => void;
}

/**
 * Renders given wallpaper maxdown content with optional enhancements and optional editability
 *
 * Note: There are two similar components:
 * - <MarkdownContent/> which renders general markdown content with some enhancements without markdown-markdown editability
 * - <MaxdownContent/> which renders specific flavor of markdown content for WebGPT with markdown-markdown editability
 *
 * @param {IArticleProps} props - The props for the component
 * @returns {JSX.Element} - The JSX element for the article
 */
export function MaxdownContent(props: MaxdownContentProps) {
    const { content, className, isEditable, onMaxdownChange } = props;

    const htmlContent = maxdownToHtml(content);

    return (
        <HtmlContent
            {...{ content: htmlContent, isEditable, className }}
            onHtmlChange={(htmlContent) => {
                if (!isEditable) {
                    return;
                }

                if (onMaxdownChange) {
                    const maxdownContent = htmlToMaxdown(htmlContent);

                    onMaxdownChange(maxdownContent);
                }
            }}
        />
    );
}

/**
 * TODO: Add emojis to maxdown
 */
