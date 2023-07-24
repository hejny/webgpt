import MonacoEditor from '@monaco-editor/react';
import { HtmlExportFile } from '../../export/exportAsHtml';
import styles from './Files.module.css';

interface FileProps {
    file: HtmlExportFile;
}

/**
 * @@
 */
export function File(props: FileProps) {
    const { file } = props;

    if (typeof file.content === 'string') {
        return (
            <MonacoEditor
                className={styles.codeView}
                theme="vs-dark"
                language={
                    file.mimeType /* <- TODO: !!! Here should be strings like "javascript" not mime-types like "text/javascript" @see https://github.com/microsoft/monaco-editor/tree/main/src/basic-languages */
                }
                options={{
                    wordWrap: 'on',
                    readOnly: true,
                }}
                key={file.pathname}
                defaultValue={file.content}
            />
        );
    } else {
        return <>!!!! Preview</>;
    }
}

/**
 * TODO: Lazy-load the <MonacoEditor/>
 * TODO: Use <MonacoEditor/> also for markdown and remove the current one
 * TODO: Use syntax highlighting for the code view @see https://www.npmjs.com/package/react-syntax-highlighter
 */
