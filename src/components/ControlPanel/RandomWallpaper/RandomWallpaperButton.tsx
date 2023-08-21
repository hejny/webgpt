import Image from 'next/image';
import Link from 'next/link';
import { classNames } from '../../../utils/classNames';
import { Hint } from '../../Hint/Hint';
import styles from '../ControlPanel.module.css';
import { useRandomWallpaper } from './useRandomWallpaper';

// TODO: !!! ALways "Renders a"

/**
 * Renders a part of the control panel that allows to go to the next wallpaper.
 */
export function RandomWallpaperButton() {
    const [randomWallpaper, consumeRandomWallpaper] = useRandomWallpaper();

    if (!randomWallpaper) {
        return (
            <div
                title="TODO: Another one not available yet - loading..."
                className={classNames(/*'button',*/ styles.button)}
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
        <Hint id="control-next" title="Show next page" reapearCount={5}>
            <Link
                className={classNames(/*'button',*/ styles.button)}
                href={`/${randomWallpaper.id}`}
                /* Note: Keeping prefetch because we want to be this as-fast-as-possible
                     + We are doing extra prefetching in the background of the wallpaper image in randomWallpaperManager
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

                <Image alt="⏭" src="/icons/openmoji/23ED.black.svg" width={40} height={40} /* <-[🧥] */ />
                {/*  <MarkdownContent content="🎲" isUsingOpenmoji /> */}
            </Link>{' '}
        </Hint>
    );
}

/**
 * TODO: Make also previous /icons/openmoji/23EE.svg
 */
