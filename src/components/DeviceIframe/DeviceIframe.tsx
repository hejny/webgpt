import Link from 'next/link';
import { classNames } from '../../utils/classNames';
import { string_url } from '../../utils/typeAliases';
import styles from './DeviceIframe.module.css';

interface DeviceIframeProps {
    src: string_url;

    isInteractive: boolean;

    /**
     * Optional CSS class name
     */
    className?: string;
}

/**
 * @@
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
