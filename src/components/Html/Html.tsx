import parse from 'html-react-parser';
import { classNames } from '../../utils/classNames';
import { string_html } from '../../utils/typeAliases';
import styles from './Html.module.css';

/**
 * A function component that renders a div element with parsed HTML content ⁘
 *
 * @param {HtmlProps} props - The props for the component.
 * @returns {JSX.Element} A div element with parsed HTML content and optional CSS class name.
 */
interface HtmlProps {
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
 * @@@
 */
export function Html(props: HtmlProps) {
    const { content, className, isEditable, onHtmlChange } = props;

    const jsx = parse(
        content,
        /*
        Maybe TODO:
        {
            replace(domNode) {
                if (domNode instanceof Element && domNode.tagName === 'img' && domNode.attribs.class === 'emoji') {
                    return <Image alt={domNode.attribs.alt} src={domNode.attribs.src} width={'10'} height={'10'} />;
                }
            },
        }
        */
    );

    return (
        <div
            className={classNames(styles.html, className)}
            contentEditable={isEditable}
            spellCheck={isEditable ? false : undefined}
            onInput={(event) => {
                if (!onHtmlChange || !isEditable) {
                    return;
                }

                const htmlContent = event.currentTarget.innerHTML satisfies string_html;

                onHtmlChange(htmlContent);
            }}
        >
            {jsx}
        </div>
    );
}
