import Link from 'next/link';
import { useState } from 'react';
import { IS_DEVELOPMENT } from '../../../config';
import { classNames } from '../../utils/classNames';
import { Color } from '../../utils/color/Color';
import { textColor } from '../../utils/color/operators/furthest';
import type { WithTake } from '../../utils/take/interfaces/ITakeChain';
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

    /**
     * Placeholder color before the iframe is loaded
     */
    color?: WithTake<Color>;
}

/**
 * Renders an iframe based on the given props
 */
export function DeviceIframe(props: DeviceIframeProps) {
    const { src, isInteractive, className, color } = props;

    const [isIframeShownInDevelopment, setIframeShownInDevelopment] = useState(false);

    if (IS_DEVELOPMENT && !isIframeShownInDevelopment) {
        return (
            <div
                className={classNames(styles.DeviceIframe, className)}
                onClick={() => setIframeShownInDevelopment(true)}
            >
                <div
                    className={styles.iframe}
                    style={{
                        padding: 30,
                        color: !color ? 'transparent' : color.then(textColor).toHex(),
                        backgroundColor: !color ? 'transparent' : color.toHex(),
                    }}
                >
                    Due to optimization NOT showing the {'<DeviceIframe />'} in development until you click here
                </div>
            </div>
        );
    } else if (isInteractive) {
        return (
            <div
                // TODO: DRY commonContainerProps and commonIframeProps
                className={classNames(styles.DeviceIframe, className)}
            >
                <iframe
                    {...{ src }}
                    frameBorder="0"
                    className={styles.iframe}
                    style={{
                        backgroundColor: !color ? 'transparent' : color.toHex(),
                    }}
                />
            </div>
        );
    } else {
        return (
            <Link
                className={classNames(styles.DeviceIframe, className)}
                href={src}
                prefetch={false /* <- Note: Because already prefetching by rendering <iframe/> */}
            >
                <iframe
                    {...{ src }}
                    frameBorder="0"
                    scrolling="no"
                    className={styles.iframe}
                    style={{ pointerEvents: 'none', backgroundColor: !color ? 'transparent' : color.toHex() }}
                />
            </Link>
        );
    }
}

/**
 * TODO: Border frame with device frame
 * TODO: Size as common devices - Tablet size, iPhone Size
 */
