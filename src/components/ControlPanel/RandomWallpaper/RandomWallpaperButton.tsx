import Image from 'next/image';
import { classNames } from '../../../utils/classNames';
import { Hint } from '../../Hint/Hint';
import { WallpaperLink } from '../../WallpaperLink/WallpaperLink';
import styles from '../ControlPanel.module.css';
import { useRandomWallpaper } from './useRandomWallpaper';

/**
 * Renders the part of the control panel that allows to go to the next wallpaper.
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
            <WallpaperLink
                className={classNames(/*'button',*/ styles.button)}
                wallpaperId={randomWallpaper.id}
                // Note:  We are doing extra prefetching in the background of the wallpaper image in randomWallpaperManager on top of the next/link prefetching

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
            </WallpaperLink>
        </Hint>
    );
}

/**
 * TODO: Make also previous /icons/openmoji/23EE.svg
 */
