import { useState } from 'react';
import { HtmlExportFile } from '../../export/exportAsHtml';
import { SelectWithFirst } from '../SelectWithFirst/SelectWithFirst';
import styles from './Files.module.css';

interface FilesProps {
    files: Array<HtmlExportFile>;
}

/**
 * @@
 */
export function Files(props: FilesProps) {
    const { files } = props;

    const [file, setFile] = useState(files[0]);

    return (
        <div className={styles.Files}>
            <SelectWithFirst
                options={files.map((file) => ({ title: file.pathname, id: file }))}
                value={file}
                onChange={setFile}
                numberOfButtons={Infinity}
            />
            <pre className={styles.codeView}>{file.content}</pre>
        </div>
    );
}
