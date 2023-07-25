import Link from 'next/link';
import { useCurrentWallpaperId } from '../../utils/hooks/useCurrentWallpaperId';
import { DeviceIframe } from '../DeviceIframe/DeviceIframe';
import styles from './ExplainContent.module.css';

/**
 * @@
 */
export function ExplainContent() {
    const wallpaperId = useCurrentWallpaperId();

    return (
        <div className={styles.ExplainContent}>
            <DeviceIframe className={styles.preview} src={`/${wallpaperId}?mode=presentation`} isInteractive={false} />

            <div className={styles.explain}>
                <h1>AI Web</h1>
                <p>This web was completely created using AI</p>
                <Link className="button" href={`/${wallpaperId}`}>
                    Show web
                </Link>
            </div>
        </div>
    );
}

/**
 * TODO: !!!! Use here the <DeviceIframe/> component
 * TODO: !!! [🧠] How should explain page look like?
 * TODO: !!! Link back to web
 * TODO: !!! Make it via AIWeb
 */
