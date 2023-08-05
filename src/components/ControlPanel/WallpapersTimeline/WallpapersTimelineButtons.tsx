import Image from 'next/image';
import Link from 'next/link';
import { classNames } from '../../../utils/classNames';
import styles from '../ControlPanel.module.css';
import { useNextWallpaper } from './useNextWallpaper';

export function WallpapersTimelineButtons() {
    const [randomWallpaper, consumeRandomWallpaper] = useNextWallpaper();

    if (!randomWallpaper) {
        return (
            <div
                className={classNames(/*'button',*/ styles.button)}
                title="Show me another one not available yet"
                style={{
                    opacity: 0.5,
                    cursor: 'not-allowed',
                }}
            >
                <Image alt="🎲" src="/icons/openmoji/1F3B2.svg" width={40} height={40} /* <-[🧥] */ />
                {/*  <MarkdownContent content="🎲" isUsingOpenmoji /> */}
            </div>
        );
    }

    return (
        <Link
            className={classNames(/*'button',*/ styles.button)}
            title="Show me another one"
            href={`/${randomWallpaper.id}`}
            /* Note: Keeping prefetch because we want to be this as-fast-as-possible
                     + We are doing extra prefetching in the background of the wallpaper image in WallpapersTimelineManager
            */

            onClick={consumeRandomWallpaper}
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

            <Image alt="🎲" src="/icons/openmoji/1F3B2.svg" width={40} height={40} /* <-[🧥] */ />
            {/*  <MarkdownContent content="🎲" isUsingOpenmoji /> */}
        </Link>
    );
}
