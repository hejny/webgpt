import { RouterContext } from 'next/dist/shared/lib/router-context';
import { useRouter } from 'next/router';
import { renderToStaticMarkup } from 'react-dom/server';
import { DEBUG } from '../../../config';
import { DebugContext } from '../../pages/_app';
import { useWallpaper, WallpapersContext } from '../../utils/hooks/useWallpaper';
import { ColorInput } from '../ColorInput/ColorInput';
import { HeaderWallpaper } from '../HeaderWallpaper/HeaderWallpaper';
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
                        <ColorInput
                            key={i}
                            defaultValue={color}
                            onChange={(newColor) => {
                                // TODO: !! DRY [🎋]
                                // TODO: !!! Reset when switching wallpapers
                                document.documentElement.style.setProperty(`--palette-${i}`, newColor.toHex());
                                document.documentElement.style.setProperty(
                                    `--palette-${i}-triplet`,
                                    `${newColor.red}, ${newColor.green}, ${newColor.blue}`,
                                );
                            }}
                        />
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
                                            <WallpapersContext.Provider
                                                value={[wallpaper]} /* <- This provider is already in ShowcasePage */
                                            >
                                                <HeaderWallpaper />
                                                {/*
                                                <ShowcasePage currentWallpaper={wallpaper} randomWallpaper={wallpaper} />
                                                */}
                                            </WallpapersContext.Provider>
                                        </ShuffleSeedContext.Provider>
                                    </DebugContext.Provider>
                                </RouterContext.Provider>,
                            );
                            console.log(html);
                            alert(html);
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
