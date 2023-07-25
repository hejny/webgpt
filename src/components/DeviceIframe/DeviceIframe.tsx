import { classNames } from '../../utils/classNames';
import { string_url } from '../../utils/typeAliases';
import styles from './DeviceIframe.module.css';

interface DeviceIframeProps {
    src: string_url;

    /**
     * Optional CSS class name
     */
    className?: string;
}

/**
 * @@
 */
export function DeviceIframe(props: DeviceIframeProps) {
    const { src, className } = props;
    return (
        <div className={classNames(styles.DeviceIframe, className)}>
            {' '}
            <iframe {...{ src }} />
        </div>
    );
}
