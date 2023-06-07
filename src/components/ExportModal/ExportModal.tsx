import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { useMemo } from 'react';
import { exportAsHtml } from '../../export/exportAsHtml';
import { usePromise } from '../../utils/hooks/usePromise';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import { Files } from '../Files/Files';
import { Modal } from '../Modal/Modal';

interface ExportModalProps {}

/**
 * @@
 */
export function ExportModal(props: ExportModalProps) {
    const wallpaper = useWallpaper();
    const exportedPromise = useMemo(
        () => /* not await */ exportAsHtml(wallpaper, { stylesPlace: 'EXTERNAL' }),
        [wallpaper],
    );
    const { value: exported } = usePromise(exportedPromise);

    return <Modal title={'Export'}>{exported && <Files files={exported.files} />}</Modal>;
}

/**
 * TODO: !!! Fix unsaved changes
 * TODO: !!! Design
 * TODO: !!! [🧠] Split into info, edit and export part
 * TODO: !!! Allow to change font
 * TODO: !!! Allow to apply color-stats with different algorithms
 * TODO: Syntax highlighting
 */
