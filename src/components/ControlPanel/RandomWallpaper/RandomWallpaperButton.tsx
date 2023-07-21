import Image from 'next/image';
import { useRouter } from 'next/router';
import { RandomWallpaperResponse } from '../../../pages/api/random-wallpaper';
import { classNames } from '../../../utils/classNames';
import { colorToDataUrl } from '../../../utils/color/utils/colorToDataUrl';
import { hydrateWallpaper } from '../../../utils/hydrateWallpaper';
import styles from './ControlPanel.module.css';

export function RandomWallpaperButton() {
    const router = useRouter();

    return (
        <button
            // TODO: !!! Go ACRY through randomWallpaper and cleanup old stuff

            /* Note: randomWallpaper image is already prerendered thare -> [🤰] <- !!!! Fix or remove + [🧠] do we want to prefetch random wallpaper, if yes, do it here */
            className={classNames(/*'button',*/ styles.button)}
            title="Show me another one"
            ref={async (element) => {
                if (!element) {
                    return;
                }

                const response = await fetch('/api/random-wallpaper');
                const { randomWallpaper: randomWallpaperSerialized } =
                    (await response.json()) as RandomWallpaperResponse;
                const randomWallpaper = hydrateWallpaper(randomWallpaperSerialized);
                console.info(`🎲 Pre-fetching next random wallpaper`, { randomWallpaper });

                // Note: !!!!
                /* not await */ fetch(`/${randomWallpaper.id}`);
                /* not await */ fetch(randomWallpaper.src);

                // !!!! TODO: addEventListener before any await OR as onClick via react
                element.addEventListener('click', async () => {
                    /*
                TODO: !!!! Remove or uncomment + write the purpose
                */

                    const headerWallpaperElement = document.getElementById(
                        'HeaderWallpaper' /* <- TODO: Some system for global css classes */,
                    )!;
                    headerWallpaperElement.setAttribute('src', colorToDataUrl(randomWallpaper.colorStats.averageColor));
                    headerWallpaperElement.removeAttribute('srcset');

                    await router.push(`/${randomWallpaper.id}`);
                });
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
