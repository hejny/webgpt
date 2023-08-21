import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { useRouter } from 'next/router';
import { SketchPicker } from 'react-color';
import { classNames } from '../../utils/classNames';
import { Color } from '../../utils/color/Color';
import { textColor } from '../../utils/color/operators/furthest';
import { useCurrentWallpaperId } from '../../utils/hooks/useCurrentWallpaperId';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import { Modal } from '../Modal/00-Modal';
import styles from './ColorsModal.module.css';
import { ColorsModalColorAlgoritm } from './ColorsModalColorAlgoritm';

/**
 * Render a modal for selecting colors for a wallpaper ⁘
 * 
 * @returns JSX.Element
 */
export function ColorsModal() {
/**
 * Get the router object from React Router ⁘
 */
    const router = useRouter();
/**
 * Get the current wallpaper id from a custom hook ⁘
 */
    const wallpaperId = useCurrentWallpaperId();
    const [wallpaper, modifyWallpaper] = useWallpaper();

    return (
        <Modal title="Colors">
            <div className={styles.section}>{wallpaper.src}</div>
            <div className={styles.section}>
                <ColorsModalColorAlgoritm />
            </div>
            <div className={classNames(styles.section, styles.palette)}>
                {wallpaper.colorStats.palette.map((color, i) => (
                    <div key={i} className={styles.paletteItem} style={{ backgroundColor: color.value.toHex() }}>
                        <p
                            style={{
                                color: color.value.then(textColor).toHex(),
                            }}
                        >
                            {color.note}
                        </p>

                        <SketchPicker
                            styles={{
                                default: {
                                    picker: {
                                        boxShadow: 'none',
                                        boxSizing: 'border-box',
                                        backgroundColor: '#77777753',
                                        padding: '10px',
                                        width: '100%',
                                    },
                                },
                            }}
                            color={color.value.toHex()}
                            // TODO: !! Use presetColors
                            onChangeComplete={({ rgb: { r, g, b } }) => {
                                modifyWallpaper((modifiedWallpaper) => {
                                    modifiedWallpaper.colorStats.palette[i]!.note = `Manually edited`;
                                    modifiedWallpaper.colorStats.palette[i]!.value = Color.fromValues(r, g, b);
                                    modifiedWallpaper.saveStage = 'EDITED';
                                    return modifiedWallpaper;
                                });
                            }}
                            disableAlpha={true}
                        />
                    </div>
                ))}
            </div>
        </Modal>
    );
}
