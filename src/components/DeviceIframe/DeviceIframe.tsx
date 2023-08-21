import Link from 'next/link';
import { classNames } from '../../utils/classNames';
import { string_css_class, string_url } from '../../utils/typeAliases';
import styles from './DeviceIframe.module.css';

interface DeviceIframeProps {
    /**
     * URL of the page to show in the iframe
     */
    src: string_url;

    /**
     * If true, the iframe is interactive (clickable)
     * If false, the iframe is like a screenshot with a link to the page
     */
    isInteractive: boolean;

    /**
     * Optional CSS class name
     */
    className?: string_css_class;
}

/**
 * @@@
 */
export function DeviceIframe(props: DeviceIframeProps) {
    const { src, isInteractive, className } = props;

    if (isInteractive) {
        return (
            <div className={classNames(styles.DeviceIframe, className)}>
                <iframe {...{ src }} frameBorder="0" />
            </div>
        );
    } else {
        return (
            <Link
                className={classNames(styles.DeviceIframe, className)}
                href={src}
                prefetch={false /* <- Note: Because already prefetching by rendering <iframe/> */}
            >
                <iframe {...{ src }} frameBorder="0" style={{ pointerEvents: 'none' }} />
            </Link>
        );
    }
}

/**
 * TODO: Border frame with device frame
 * TODO: Size as common devices - Tablet size, iPhone Size
 */
