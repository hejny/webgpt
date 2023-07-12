import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { classNames } from '../../utils/classNames';
import { textColor } from '../../utils/color/operators/furthest';
import { useCurrentWallpaperId } from '../../utils/hooks/useCurrentWallpaperId';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import { take } from '../../utils/take/take';
import { ColorInput } from '../ColorInput/ColorInput';
import { ImagineTag } from '../ImagineTag/ImagineTag';
import { Modal } from '../Modal/Modal';
import styles from './ColorsModal.module.css';
import { ColorsModalColorAlgoritm } from './ColorsModalColorAlgoritm';

interface ColorsModalProps {}

/**
 * @@
 */
export function ColorsModal(props: ColorsModalProps) {
    const router = useRouter();
    const wallpaperId = useCurrentWallpaperId();
    const [wallpaper, modifyWallpaper] = useWallpaper();

    return (
        <Modal title="Editing">
            <div className={styles.section}>
                <ImagineTag>{wallpaper.prompt || 'No prompt'}</ImagineTag>
            </div>

            {/* TODO: !!! <ColorStatsInput/> + [🧠] with modal sections */}
            <div className={styles.section}>
                <ColorsModalColorAlgoritm />
            </div>
            <div className={classNames(styles.section, styles.palette)}>
                {wallpaper.colorStats.palette.map((color, i) => (
                    <div key={i} className={styles.paletteItem} style={{ backgroundColor: color.value.toHex() }}>
                        <ColorInput
                            defaultValue={color.value}
                            onChange={
                                /* Remove ACRY on ColorInput !!!! -> */ debounce((newColor) => {
                                    // TODO: !!!!! This works BUT only if also content is changed - try to make <ColorStatsInput/> first and then this

                                    modifyWallpaper((modifiedWallpaper) => {
                                        modifiedWallpaper.colorStats.palette[i].value = take(newColor);
                                        modifiedWallpaper.saveStage = 'EDITED';
                                        return modifiedWallpaper;
                                    });
                                }, 100 /* <- TODO: Do it more efficiently and then debounce */)
                            }
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
        </Modal>
    );
}
