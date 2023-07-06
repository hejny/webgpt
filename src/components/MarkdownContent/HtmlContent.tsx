import { string_html } from '../../utils/typeAliases';

interface HtmlContentProps {
    /**
     * Source html
     */
    content: string_html;

    /**
     * Optional CSS class name
     */
    className?: string;

    /**
     * Is editable by user
     */
    isEditable?: boolean;

    /**
     * Callback when content is changed
     *
     * Note: This is used only when isEditable is true
     */
    onHtmlChange?: (content: string_html) => void;
}

/**
 * Renders html content with optional editing capabilities
 */
export function HtmlContent(props: HtmlContentProps) {
    const { content, className, isEditable, onHtmlChange } = props;

    return (
        <div
            {...{ className }}
            contentEditable={isEditable}
            spellCheck={isEditable ? false : undefined}
            onInput={(event) => {
                if (!onHtmlChange || !isEditable) {
                    return;
                }

                const htmlContent = event.currentTarget.innerHTML satisfies string_html;

                onHtmlChange(htmlContent);
            }}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}

/**
 * TODO: [🧠][💬] Allow to change fonts and do rich text editing
 */
