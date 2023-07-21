import Image from 'next/image';
import { useRouter } from 'next/router';
import { classNames } from '../../../utils/classNames';
import { colorToDataUrl } from '../../../utils/color/utils/colorToDataUrl';
import styles from '../ControlPanel.module.css';
import { useRandomWallpaperManager } from './useRandomWallpaperManager';

export function RandomWallpaperButton() {
    const router = useRouter();
    const randomWallpaperManager = useRandomWallpaperManager();

    return (
        <button
            // TODO: !!! Go ACRY through randomWallpaper and cleanup old stuff

            /* Note: randomWallpaper image is already prerendered thare -> [🤰] <- !!!! Fix or remove + [🧠] do we want to prefetch random wallpaper, if yes, do it here */
            className={classNames(/*'button',*/ styles.button)}
            title="Show me another one"
            onClick={async () => {
                const randomWallpaper = randomWallpaperManager.getRandomWallpaper();

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
        </button>
    );
}
