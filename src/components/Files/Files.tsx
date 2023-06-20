import Editor from '@monaco-editor/react';
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

    if (files.length === 0) {
        throw new Error('You must provide at least one file. when using <Files/>');
    }

    const [filename, setFilename] = useState<string>(files[0].pathname);
    const file = files.find((file) => file.pathname === filename);

    return (
        <div className={styles.Files}>
            <div className={styles.files}>
                <SelectWithFirst
                    options={files.map((file) => ({ title: file.pathname, id: file.pathname }))}
                    value={filename}
                    onChange={setFilename}
                    numberOfButtons={Infinity}
                />
            </div>
            <Editor
                className={styles.codeView}
                height="90vh"
                defaultLanguage="javascript"
                defaultValue={file ? file.content : ''}
            />
            ;
        </div>
    );
}

/**
 * TODO: !!!! Select only wanted
 * TODO: Lazy-load the Monaco <Editor/>
 * TODO: Use Monaco <Editor/> also for markdown and remove the current one
 * TODO: Use syntax highlighting for the code view @see https://www.npmjs.com/package/react-syntax-highlighter
 */
