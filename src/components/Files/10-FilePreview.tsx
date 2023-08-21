import MonacoEditor from '@monaco-editor/react';
import { HtmlExportFile } from '../../export/HtmlExportFile';
import styles from './00-FilesPreview.module.css';
import { ImageFilePreview } from './20-ImageFilePreview';

interface FilePreviewProps {

    /**
     * File to preview
     */
    file: HtmlExportFile;
}

/**
 * @@
 */
export function FilePreview(props: FilePreviewProps) {
    const { file } = props;

    if (file.mimeType.startsWith('text/') && typeof file.content === 'string') {
        return (
            <MonacoEditor
                className={styles.filePreview}
                theme="vs-dark"
                language={
                    file.mimeType /* <- TODO: Here should be strings like "javascript" not mime-types like "text/javascript" @see https://github.com/microsoft/monaco-editor/tree/main/src/basic-languages */
                }
                options={{
                    wordWrap: 'on',
                    readOnly: true,
                }}
                key={file.pathname}
                defaultValue={file.content}
            />
        );
    } else if (file.mimeType.startsWith('image/') && file.content instanceof Blob) {
        return (
            <div className={styles.filePreview}>
                <ImageFilePreview imageFileContent={file.content} />
            </div>
        );
    } else {
        return <div className={styles.filePreview}>Can not create preview of this file</div>;
    }
}

/**
 * TODO: Lazy-load the <MonacoEditor/>
 * TODO: Use <MonacoEditor/> also for markdown and remove the current one
 * TODO: Use syntax highlighting for the code view @see https://www.npmjs.com/package/react-syntax-highlighter
 */
