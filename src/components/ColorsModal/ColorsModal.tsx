import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { debounce } from 'lodash';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { classNames } from '../../utils/classNames';
import { textColor } from '../../utils/color/operators/furthest';
import { useCurrentWallpaperId } from '../../utils/hooks/useCurrentWallpaperId';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import { take } from '../../utils/take/take';
import { ColorInput } from '../ColorInput/ColorInput';
import { ImagineTag } from '../ImagineTag/ImagineTag';
import { Modal, OpenModalLink } from '../Modal/Modal';
import styles from './ColorsModal.module.css';
import { ColorsModalColorAlgoritm } from './ColorsModalColorAlgoritm';
import { SaveBoardButton } from './CreateWallpaperButton/CreateWallpaperButton';

const MarkdownEditor = dynamic(() => import('@uiw/react-markdown-editor').then((mod) => mod.default), { ssr: false });
const ColorsModalDownloadButtons = dynamic(
    () => import('./ColorsModalDownloadButtons').then(({ ColorsModalDownloadButtons }) => ColorsModalDownloadButtons),
    {
        loading: () => <p>Loading...</p>,
    },
);

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

            {/*
            <div className={styles.section}>
                <div>
                    averageColor:
                    <ColorBox value={wallpaper.colorStats.averageColor} />
                </div>

                {/*<pre>{JSON.stringify(wallpaper.colorStats, null, 4)}</pre>* /}
            </div>
            */}

            <div className={styles.section}>
                <MarkdownEditor
                    className={styles.editor}
                    value={wallpaper.content}
                    onChange={(content) => {
                        modifyWallpaper((modifiedWallpaper) => {
                            modifiedWallpaper.content = content;
                            modifiedWallpaper.saveStage = 'EDITED';
                            return modifiedWallpaper;
                        });
                    }}
                    // TODO: Hide fullscreen button
                    // toolbarsFilter={(tool) => tool === 'fullscreen'}
                />
            </div>

            <div className={styles.section}>
                <ColorsModalDownloadButtons />
                <OpenModalLink className={'button'} modal={'export'}>
                    More Download Options
                </OpenModalLink>
                <button
                    className={'button'}
                    onClick={() => {
                        (window as any).fooFunction();
                    }}
                >
                    {/* TODO: !! Remove */}
                    Invoke error
                </button>

                <SaveBoardButton parentWallpaperId={wallpaperId} {...wallpaper /* <- !!! Save UPDATED colorStats */}>
                    Save
                </SaveBoardButton>

                <Link
                    className={'button'}
                    href={{
                        pathname: '/[wallpaper]',
                        query: {
                            wallpaper: router.query.wallpaper,
                        },
                    }}
                >
                    Done
                </Link>
            </div>
        </Modal>
    );
}

/**
 * TODO: !!! Color of modal UI should be indipendent of wallpaper
 * TODO: !!! Fix unsaved changes
 * TODO: !!! [🧠] Split into info, edit and export part
 * TODO: !!! Allow to apply color-stats with different algorithms
 */
