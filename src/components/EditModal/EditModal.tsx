import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { renderToStaticMarkup } from 'react-dom/server';
import { DEBUG } from '../../../config';
import { DebugContext } from '../../pages/_app';
import { useClosePreventionSystem } from '../../utils/hooks/useClosePreventionSystem';
import { useCurrentWallpaperId } from '../../utils/hooks/useCurrentWallpaperId';
import { useObservable } from '../../utils/hooks/useObservable';
import { useWallpaperSubject } from '../../utils/hooks/useWallpaperSubject';
import { WallpapersContext } from '../../utils/hooks/WallpapersContext';
import { hydrateWallpapers } from '../../utils/hydrateWallpapers';
import { ColorInput } from '../ColorInput/ColorInput';
import { HeaderWallpaper } from '../HeaderWallpaper/HeaderWallpaper';
import { ImagineTag } from '../ImagineTag/ImagineTag';
import { SelectWithFirst } from '../SelectWithFirst/SelectWithFirst';
import { ShuffleSeedContext } from '../Shuffle/Shuffle';
import styles from './EditModal.module.css';

const MarkdownEditor = dynamic(() => import('@uiw/react-markdown-editor').then((mod) => mod.default), { ssr: false });

interface EditModalProps {
    turnOffEditing(): void;
}

/**
 * @@
 */
export function EditModal(props: EditModalProps) {
    const { turnOffEditing } = props;
    const wallpaperId = useCurrentWallpaperId();
    const wallpaperSubject = useWallpaperSubject(wallpaperId);
    const { value: wallpaper } = useObservable(wallpaperSubject);
    const router = useRouter();
    const closePreventionSystem = useClosePreventionSystem();

    return (
        <>
            <div className={styles.overlay} onClick={turnOffEditing}></div>
            <div className={styles.EditModal}>
                <div className={styles.title}>Editing</div>
                <div className={styles.xxxx}>
                    <ImagineTag>{wallpaper.prompt}</ImagineTag>
                </div>
                <div className={styles.xxxx}>
                    <SelectWithFirst
                        title="Color algorithm"
                        value={wallpaper.colorStats.version}
                        onChange={(version) => {
                            /* !!! */
                        }}
                        numberOfButtons={0}
                        options={[
                            {
                                id: wallpaper.colorStats.version,
                                title: wallpaper.colorStats.version,
                            },
                        ]}
                    />
                </div>
                <div className={styles.xxxx}>
                    {wallpaper.colorStats.palette.map((color, i) => (
                        <ColorInput
                            key={i}
                            defaultValue={color}
                            onChange={(newColor) => {
                                // TODO: [🧠] !! DRY [🎋]
                                // TODO: [🧠] !! Reset when switching wallpapers

                                closePreventionSystem.registerClosePrevention({
                                    canBeClosed: false /* <- TODO: Change according to if downloaded or not */,
                                });
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
                    <MarkdownEditor
                        className={styles.editor}
                        value={wallpaper.content}
                        onChange={(content) => {
                            closePreventionSystem.registerClosePrevention({
                                canBeClosed: false /* <- TODO: Change according to if downloaded or not */,
                            });
                            wallpaperSubject.next({ ...wallpaperSubject.value, content });
                        }}
                        // TODO: Hide fullscreen button
                        // toolbarsFilter={(tool) => tool === 'fullscreen'}
                    />
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
                                                value={hydrateWallpapers([
                                                    wallpaper as any,
                                                ])} /* <- This provider is already in ShowcasePage */
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
