import Image from 'next/image';
import Link from 'next/link';
import { classNames } from '../../../utils/classNames';
import styles from '../ControlPanel.module.css';
import { useRandomWallpaper } from './useRandomWallpaper';

export function RandomWallpaperButton() {
    const [randomWallpaper, consumeRandomWallpaper] = useRandomWallpaper();

    if (!randomWallpaper) {
        return (
            <div
                className={classNames(/*'button',*/ styles.button)}
                title="Another one not available yet - loading..."
                style={{
                    opacity: 0.5,
                    cursor: 'not-allowed',
                }}
            >
                <Image alt="⏭" src="/icons/openmoji/23ED.black.svg" width={40} height={40} /* <-[🧥] */ />
                {/*  <MarkdownContent content="🎲" isUsingOpenmoji /> */}
            </div>
        );
    }

    return (
        <Link
            className={classNames(/*'button',*/ styles.button)}
            title="Show next page"
            href={`/${randomWallpaper.id}`}
            /* Note: Keeping prefetch because we want to be this as-fast-as-possible
                     + We are doing extra prefetching in the background of the wallpaper image in randomWallpaperManager
            */

            onClick={consumeRandomWallpaper}
            data-ai-component="hint"
            style={
                {
                    // ...minorButtonStyle,
                    // TODO: Better or delete
                    // backgroundColor: randomWallpaper.colorStats.averageColor.toHex(),
                    // color: randomWallpaper.colorStats.averageColor.then(textColor).toHex(),
                }
            }
        >
            {/* TODO: This should have more role like next not random */}

            <Image alt="⏭" src="/icons/openmoji/23ED.black.svg" width={40} height={40} /* <-[🧥] */ />
            {/*  <MarkdownContent content="🎲" isUsingOpenmoji /> */}
        </Link>
    );
}

/**
 * TODO: Make also previous /icons/openmoji/23EE.svg
 */
