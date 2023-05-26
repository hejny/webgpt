import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { exportAsHtml } from '../../export/exportAsHtml';
import { exportAsZip } from '../../export/exportAsZip';
import { getWallpaperBaseFilename } from '../../export/getWallpaperBaseFilename';
import { induceFileDownload } from '../../export/utils/induceFileDownload';
import { useClosePreventionSystem } from '../../utils/hooks/useClosePreventionSystem';
import { useCurrentWallpaperId } from '../../utils/hooks/useCurrentWallpaperId';
import { useObservable } from '../../utils/hooks/useObservable';
import { useWallpaperSubject } from '../../utils/hooks/useWallpaperSubject';
import { ColorBox } from '../Color/ColorBox';
import { ColorInput } from '../ColorInput/ColorInput';
import { ImagineTag } from '../ImagineTag/ImagineTag';
import { SelectWithFirst } from '../SelectWithFirst/SelectWithFirst';
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
                        <div key={i}>
                            <ColorInput
                                defaultValue={color.value}
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
                            <p>{color.note}</p>
                        </div>
                    ))}
                </div>
                <div className={styles.xxxx}>
                    <div>
                        averageColor:
                        <ColorBox value={wallpaper.colorStats.averageColor} />
                    </div>

                    {/*<pre>{JSON.stringify(wallpaper.colorStats, null, 4)}</pre>*/}
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

                    {/* TODO: !! Lazy-import export buttons */}

                    <button
                        className={'button'}
                        onClick={async () => {
                            /* not await */ induceFileDownload(await exportAsZip(wallpaper));
                        }}
                    >
                        Download as ZIP
                    </button>

                    <button
                        className={'button'}
                        onClick={async () => {
                            const html = await exportAsHtml(wallpaper);
                            const file = new File([html], getWallpaperBaseFilename(wallpaper) + '.html', {
                                type: 'text/html',
                            });
                            /* not await */ induceFileDownload(file);
                        }}
                    >
                        Download as HTML
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
