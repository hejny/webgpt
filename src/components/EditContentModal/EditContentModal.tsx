import MonacoEditor from '@monaco-editor/react';
import { useCurrentWallpaper } from '../../utils/hooks/useCurrentWallpaper';
import { validateMaxdown } from '../Content/Maxdown/validateMaxdown';
import { Modal } from '../Modal/00-Modal';
import styles from './EditContentModal.module.css';

/**
 * Renders the modal for exporting wallpaper page as code
 */
export function EditContentModal() {
    const [wallpaper, modifyWallpaper] = useCurrentWallpaper();

    return (
        <Modal title={'Edit the content'} isCloseable>
            <MonacoEditor
                className={styles.editor}
                theme="vs-dark"
                language={'markdown'}
                options={{
                    wordWrap: 'on',
                }}
                defaultValue={wallpaper.content}
                onChange={(newContent) => {
                    if (typeof newContent !== 'string') {
                        return;
                    }
                    modifyWallpaper((modifiedWallpaper) => {
                        modifiedWallpaper.content = validateMaxdown(newContent);
                        modifiedWallpaper.saveStage = 'EDITED';
                        return modifiedWallpaper;
                    });
                }}
            />
        </Modal>
    );
}

/**
 * TODO: [🛴] Lazy-load the <MonacoEditor/>
 */
