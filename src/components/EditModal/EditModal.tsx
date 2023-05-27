import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { classNames } from '../../utils/classNames';
import { textColor } from '../../utils/color/operators/furthest';
import { useClosePreventionSystem } from '../../utils/hooks/useClosePreventionSystem';
import { useCurrentWallpaperId } from '../../utils/hooks/useCurrentWallpaperId';
import { useObservable } from '../../utils/hooks/useObservable';
import { useWallpaperSubject } from '../../utils/hooks/useWallpaperSubject';
import { ColorBox } from '../ColorBox/ColorBox';
import { ColorInput } from '../ColorInput/ColorInput';
import { ImagineTag } from '../ImagineTag/ImagineTag';
import { SelectWithFirst } from '../SelectWithFirst/SelectWithFirst';
import styles from './EditModal.module.css';

const MarkdownEditor = dynamic(() => import('@uiw/react-markdown-editor').then((mod) => mod.default), { ssr: false });
const EditModalDownloadButtons = dynamic(
    () => import('./EditModalDownloadButtons').then(({ EditModalDownloadButtons }) => EditModalDownloadButtons),
    {
        loading: () => <p>Loading...</p>,
    },
);

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
                <div className={styles.section}>
                    <ImagineTag>{wallpaper.prompt}</ImagineTag>
                </div>
                <div className={styles.section}>
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
                <div className={classNames(styles.section, styles.palette)}>
                    {wallpaper.colorStats.palette.map((color, i) => (
                        <div key={i} className={styles.paletteItem} style={{ backgroundColor: color.value.toHex() }}>
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
                            <p
                                style={{
                                    color: color.value.then(textColor).toHex(),
                                }}
                            >
                                {color.note}
                            </p>
                        </div>
                    ))}
                </div>
                <div className={styles.section}>
                    <div>
                        averageColor:
                        <ColorBox value={wallpaper.colorStats.averageColor} />
                    </div>

                    {/*<pre>{JSON.stringify(wallpaper.colorStats, null, 4)}</pre>*/}
                </div>

                <div className={styles.section}>
                    <EditModalDownloadButtons />
                    <button className={'button'} onClick={turnOffEditing}>
                        Done
                    </button>
                </div>

                <div className={styles.section}>
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
            </div>
        </>
    );
}

/**
 * TODO: !!! Fix unsaved changes
 * TODO: !!! Design
 * TODO: !!! [🧠] Split into info, edit and export part
 * TODO: !!! Allow to apply color-stats with different algorithms
 */
