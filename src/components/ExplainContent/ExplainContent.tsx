import Link from 'next/link';
import { useCurrentWallpaperId } from '../../utils/hooks/useCurrentWallpaperId';
import styles from './ExplainContent.module.css';

/**
 * @@
 */
export function ExplainContent() {
    const wallpaperId = useCurrentWallpaperId();

    return (
        <div className={styles.ExplainContent}>
            <h1>AI Web</h1>

            <iframe
                className={styles.device}
                src={`/${wallpaperId}?mode=presentation`}
                // iPhone Size
                frameBorder="0"
            />

            <p>This web was completely created using AI</p>

            <Link className="button" href={`/${wallpaperId}`}>
                Show web
            </Link>
        </div>
    );
}

/**
 * TODO: !!! [🧠] How should explain page look like?
 * TODO: !!! Link back to web
 * TODO: !!! Make it via AIWeb
 */
