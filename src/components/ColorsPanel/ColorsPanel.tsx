import { useEffect, useState } from 'react';
import { classNames } from '../../utils/classNames';
import { useLastSavedWallpaper } from '../../utils/hooks/useLastSavedWallpaper';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import { ColorInput } from '../ColorPreview/ColorInput/ColorInput';
import { ColorPreview } from '../ColorPreview/ColorPreview';
import { WallpaperLink } from '../WallpaperLink/WallpaperLink';
import styles from './ColorsPanel.module.css';

interface ColorsPanelProps {}

/**
 * @@@
 */
export function ColorsPanel(props: ColorsPanelProps) {
    const [wallpaper, modifyWallpaper] = useWallpaper();
    const lastSavedWallpaper = useLastSavedWallpaper();

    // TODO: Maybe make hook useTemporaryToggle
    const [isOpen, setOpen] = useState(false);
    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const timeout = setTimeout(() => {
            setOpen(false);
        }, 5000);

        return () => {
            clearTimeout(timeout);
        };
    }, [isOpen, setOpen]);

    return (
        <div
            className={classNames(
                'aiai-controls' /* <- TODO: [🧠] ACRY remove aiai-controls class OR figure out how to propperly and semantically mark controls */,
                styles.ColorsPanel,
                isOpen && styles.open,
            )}
            onClick={() => setOpen(true)}
            onPointerMove={() => setOpen(true)}
        >
            <div className={classNames(styles.colorPickerWrapper)}>
                <WallpaperLink modal="colors" prefetch={false /* <- Note: Because this is a bit rare options */}>
                    <ColorPreview className={styles.colorPicker} color={'HUE_CIRCLE'} />
                </WallpaperLink>
            </div>

            {wallpaper.colorStats.palette.map((color, i) => (
                <div key={i} className={styles.colorPickerWrapper}>
                    <ColorInput
                        className={styles.colorPicker}
                        value={color.value}
                        onChange={(newColor) => {
                            modifyWallpaper((modifiedWallpaper) => {
                                modifiedWallpaper.colorStats.palette[i].value = newColor;
                                modifiedWallpaper.saveStage = 'EDITED';
                                return modifiedWallpaper;
                            });
                        }}
                        presetColors={
                            // TODO: Optimize, do just once not for every color:
                            lastSavedWallpaper.colorStats.palette.map((color) => ({
                                title: color.note,
                                color: color.value.toHex(),
                            }))
                        }
                    />
                </div>
            ))}
        </div>
    );
}

/**
 * TODO: Maybe allow to close the colors
 * TODO: !!!! [🧠] Semantic color palette - plan where each color should be used (and do not duplicate bg and ui items)
 */
