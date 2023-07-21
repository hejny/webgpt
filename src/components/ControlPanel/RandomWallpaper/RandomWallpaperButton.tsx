import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { classNames } from '../../../utils/classNames';
import { colorToDataUrl } from '../../../utils/color/utils/colorToDataUrl';
import styles from '../ControlPanel.module.css';
import { useRandomWallpaper } from './useRandomWallpaper';

export function RandomWallpaperButton() {
    const router = useRouter();
    const randomWallpaper = useRandomWallpaper();

    if (!randomWallpaper) {
        return <></>;
    }

    return (
        <Link
            // TODO: !!! Go ACRY through randomWallpaper and cleanup old stuff

            /* Note: randomWallpaper image is already prerendered thare -> [🤰] <- !!!! Fix or remove + [🧠] do we want to prefetch random wallpaper, if yes, do it here */
            className={classNames(/*'button',*/ styles.button)}
            title="Show me another one"
            href={`/${randomWallpaper.id}`}
            /* Note: Keeping prefetch because we want to be this as-fast-as-possible
                     + We are doing extra prefetching in the background of the wallpaper image in randomWallpaperManager
            */
            onClick={async () => {
                // Note: No need for preventDefault

                const headerWallpaperElement = document.getElementById(
                    'HeaderWallpaper' /* <- TODO: Some system for global css classes */,
                )!;
                headerWallpaperElement.setAttribute('src', colorToDataUrl(randomWallpaper.colorStats.averageColor));
                headerWallpaperElement.removeAttribute('srcset');

                await router.push(`/${randomWallpaper.id}`);
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

/**
 * TODO: Keep place where randomWallpaper is loading - do not blink the UI
 */
