import parse from 'html-react-parser';
import { Promisable } from 'type-fest';
import { classNames } from '../../utils/classNames';
import { usePromise } from '../../utils/hooks/usePromise';
import styles from './Html.module.css';

/**
 * A function component that renders a div element with parsed HTML content ⁘
 *
 * @param {HtmlProps} props - The props for the component.
 * @returns {JSX.Element} A div element with parsed HTML content and optional CSS class name.
 */
interface HtmlProps {
    html: Promisable<string>;
    className?: string;
}

/**
 * @@@
 */
export function Html(props: HtmlProps) {
    const { html, className } = props;

    const { value: htmlLoaded } = usePromise(html);

    if (!htmlLoaded) {
        return <></>;
    }

    const content = parse(
        htmlLoaded,
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

    return <div className={classNames(styles.html, className)}>{content}</div>;
}
