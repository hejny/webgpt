import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useMemo } from 'react';
import { exportAsHtml } from '../../export/exportAsHtml';
import { usePromise } from '../../utils/hooks/usePromise';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import styles from './ExportModal.module.css';

interface ExportModalProps {}

/**
 * @@
 */
export function ExportModal(props: ExportModalProps) {
    const router = useRouter();
    const wallpaper = useWallpaper();
    const exportedPromise = useMemo(
        () => /* not await */ exportAsHtml(wallpaper, { stylesPlace: 'EXTERNAL' }),
        [wallpaper],
    );
    const { value: exported } = usePromise(exportedPromise);

    return (
        <>
            <Link
                className={styles.overlay}
                href={{
                    pathname: router.pathname,
                    query: {
                        slug: router.query.slug,
                    },
                }}
            />
            <div className={styles.ExportModal}>
                <div className={styles.title}>Export</div>

                {exported && (
                    <>
                        {exported.files.map((file, i) => (
                            <pre
                                key={i}
                                style={{
                                    width: '90%',
                                    height: '60vh',
                                    overflow: 'scroll',
                                    backgroundColor: '#222',
                                    color: '#ccc',
                                }}
                            >
                                {file.content}
                            </pre>
                        ))}
                    </>
                )}
            </div>
        </>
    );
}

/**
 * TODO: !!! Fix unsaved changes
 * TODO: !!! Design
 * TODO: !!! [🧠] Split into info, edit and export part
 * TODO: !!! Allow to change font
 * TODO: !!! Allow to apply color-stats with different algorithms
 */
