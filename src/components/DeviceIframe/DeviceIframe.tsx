import Link from 'next/link';
import { classNames } from '../../utils/classNames';
import { string_url } from '../../utils/typeAliases';
import styles from './DeviceIframe.module.css';

interface DeviceIframeProps {
    src: string_url;

    isInteractive: boolean;

    isButtonShown?: boolean;

    /**
     * Optional CSS class name
     */
    className?: string;
}

/**
 * @@
 */
export function DeviceIframe(props: DeviceIframeProps) {
    const { src, isInteractive, isButtonShown, className } = props;
    return (
        <div className={classNames(styles.DeviceIframe, className)}>
            <iframe {...{ src }} frameBorder="0" style={{ pointerEvents: isInteractive ? 'all' : 'none' }} />

            {isButtonShown && (
                <Link className="button" href={src}>
                    Show web
                </Link>
            )}
        </div>
    );
}

/**
 * TODO: Border frame with device frame
 * TODO: Size as common devices - Tablet size, iPhone Size
 */
