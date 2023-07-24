import { useEffect, useState } from 'react';
import { HtmlExportFile } from '../../export/exportAsHtml';
import { Select } from '../Select/Select';
import { File } from './File';
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

    useEffect(() => {
        if (!file) {
            setFilename(files[0].pathname);
        }
    }, [files, file, setFilename]);

    if (!file) {
        return <></>;
    }

    // !!! {['image','other'].includes()} Work with image files

    return (
        <div className={styles.Files}>
            <div className={styles.files}>
                <Select
                    options={Object.fromEntries(files.map((file) => [file.pathname, file.pathname]))}
                    value={filename}
                    onChange={(newFilename) => setFilename(newFilename)}
                    visibleButtons={Infinity}
                />
            </div>
            <File {...{ file }} />;
        </div>
    );
}

/**
 * TODO: Lazy-load the <MonacoEditor/>
 * TODO: Use <MonacoEditor/> also for markdown and remove the current one
 * TODO: Use syntax highlighting for the code view @see https://www.npmjs.com/package/react-syntax-highlighter
 */
