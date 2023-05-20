import { RouterContext } from 'next/dist/shared/lib/router-context';
import { useRouter } from 'next/router';
import { renderToStaticMarkup } from 'react-dom/server';
import { DEBUG } from '../../../config';
import ShowcasePage from '../../pages/showcase/[slug]';
import { DebugContext } from '../../pages/_app';
import { Color } from '../../utils/color/Color';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import { ImagineTag } from '../ImagineTag/ImagineTag';
import { ShuffleSeedContext } from '../Shuffle/Shuffle';
import styles from './EditModal.module.css';

interface EditModalProps {
    turnOffEditing(): void;
}

/**
 * @@
 */
export function EditModal(props: EditModalProps) {
    const { turnOffEditing } = props;
    const wallpaper = useWallpaper();
    const router = useRouter();

    return (
        <>
            <div className={styles.overlay} onClick={turnOffEditing}></div>
            <div className={styles.EditModal}>
                <div className={styles.title}>Editing</div>
                <div className={styles.xxxx}>
                    <ImagineTag>{wallpaper.prompt}</ImagineTag>
                </div>
                <div className={styles.xxxx}>
                    {wallpaper.colorStats.palette.map((color, i) => (
                        <div key={i}>
                            Color #{i + 1}{' '}
                            <input
                                type="color"
                                defaultValue={color.toHex()}
                                onChange={(event) => {
                                    const color = Color.fromHex(event.target.value);
                                    // TODO: !! DRY [🎋]
                                    document.documentElement.style.setProperty(`--palette-${i}`, color.toHex());
                                    document.documentElement.style.setProperty(
                                        `--palette-${i}-triplet`,
                                        `${color.red}, ${color.green}, ${color.blue}`,
                                    );
                                }}
                            />
                        </div>
                    ))}
                </div>
                <div className={styles.xxxx}>
                    <button className={'button'} onClick={turnOffEditing}>
                        Done
                    </button>

                    <button
                        className={'button'}
                        onClick={() => {
                            const html = renderToStaticMarkup(
                                <RouterContext.Provider value={router}>
                                    <DebugContext.Provider value={DEBUG}>
                                        <ShuffleSeedContext.Provider value={new Date().getUTCMinutes()}>
                                            <ShowcasePage currentWallpaper={wallpaper} randomWallpaper={wallpaper} />
                                        </ShuffleSeedContext.Provider>
                                    </DebugContext.Provider>
                                </RouterContext.Provider>,
                            );
                            console.log(html);
                        }}
                    >
                        Download
                    </button>
                </div>
            </div>
        </>
    );
}

/**
 * TODO: !!! Design
 * TODO: !!! Split into info and edit part
 * TODO: !!! Allow to apply color-stats with different algorithms
 */
