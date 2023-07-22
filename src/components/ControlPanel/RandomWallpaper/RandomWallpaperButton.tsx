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
            // TODO: !!! Go ACRY through randomWallpaper and cleanup old stuff

            /* Note: randomWallpaper image is already prerendered thare -> [🤰] <- !!!! Fix or remove + [🧠] do we want to prefetch random wallpaper, if yes, do it here */

// !!!! prefetch={false}
            className={classNames(/*'button',*/ styles.button)}
            title="Show me another one"
            href={`/${randomWallpaper.id}`}
            /* Note: Keeping prefetch because we want to be this as-fast-as-possible
                     + We are doing extra prefetching in the background of the wallpaper image in randomWallpaperManager
            */

            onClick={async () => {
                // Note: This onClick handler is here to speed up the navigation to the next random wallpaper
                //       We want to feel it as fast as possible and near-instantly
                //       No need for preventDefault

                consumeRandomWallpaper();

                const randomWallpaperImage = document.querySelector(
                    `img[src='${randomWallpaper.src}']`,
                ) as HTMLImageElement;
                const headerWallpaperElement = document.getElementById('HeaderWallpaper') as HTMLImageElement;

                //headerWallpaperElement.setAttribute('src', randomWallpaperImage.src);
                //headerWallpaperElement.removeAttribute('srcset');
            }}
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
