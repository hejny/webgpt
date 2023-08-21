import { useWallpaper } from '../../utils/hooks/useWallpaper';
import styles from './HeaderWallpaper.module.css';


/**
 * Renders a main image of the wallpaper page
 */
export function HeaderWallpaper() {
    const [{ src, prompt, title, colorStats }] = useWallpaper();

    const quality = 97;
    const width = 1920;

    // console.log({ src, prompt, colorStats });

    return (
        <div className={styles.HeaderWallpaper} style={{ /* [🎗] */ backgroundColor: colorStats.averageColor.toHex() }}>
            <div className={styles.inner}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={src} /* <- TODO: Here should be really upscaled version by Upscalyr */
                    alt={prompt || title}
                    draggable="false"
                    loading="eager"
                    height={Math.round((width / 1920) * 1080)}
                    style={{
                        /* [🎗] */ objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                        backgroundColor: colorStats.averageColor.toHex(),
                    }}
                    {...{ width, quality }}
                />
            </div>
        </div>
    );
}

/**
 * TODO: In export get rid of data-nimg
 * TODO: [🧬] !! Fake generating - Unblur image in steps
 * TODO: [🧬] In future better diffusion simulator
 * TODO: [🧬] ? Maybe whole page from grayscale to full color
 */
