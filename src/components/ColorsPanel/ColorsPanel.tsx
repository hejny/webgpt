import Link from 'next/link';
import { useRouter } from 'next/router';
import { classNames } from '../../utils/classNames';
import { useLastSavedWallpaper } from '../../utils/hooks/useLastSavedWallpaper';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import { ColorInput } from '../ColorInput/ColorInput';
import { ColorPreview } from '../ColorPreview/ColorPreview';
import styles from './ColorsPanel.module.css';

interface ColorsPanelProps {}

/**
 * @@@
 */
export function ColorsPanel(props: ColorsPanelProps) {
    const router = useRouter();

    const [wallpaper, modifyWallpaper] = useWallpaper();
    const lastSavedWallpaper = useLastSavedWallpaper();

    return (
        <div
            className={classNames(
                'aiai-controls' /* <- TODO: [🧠] ACRY remove aiai-controls class OR figure out how to propperly and semantically mark controls */,
                styles.ColorsPanel,
            )}
        >
            <div className={classNames(styles.colorPickerWrapper)}>
                <Link
                    href={{
                        pathname: '/[wallpaper]',
                        query: {
                            wallpaper: router.query.wallpaper,
                            modal: 'colors',
                        },
                    }}
                    prefetch={false /* <- Note: Because this is a bit rare options */}
                >
                    <ColorPreview color={'HUE_CIRCLE'} />
                </Link>
            </div>

            {wallpaper.colorStats.palette.map((color, i) => (
                <div key={i} className={classNames(styles.colorPickerWrapper)}>
                    <ColorInput
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
 * TODO: !!!! [🧠] Semantic color palette - plan where each color should be used (and do not duplicate bg and ui items)
 */
