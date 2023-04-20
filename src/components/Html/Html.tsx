import parse from 'html-react-parser';
import { classNames } from '../../utils/classNames';
import styles from './Html.module.css';

interface HtmlProps {
    html: string;
    className?: string;
}

export function Html(props: HtmlProps) {
    const { html, className } = props;

    const content = parse(
        html,
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
