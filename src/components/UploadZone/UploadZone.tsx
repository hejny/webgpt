import { ReactNode, useState } from 'react';
import { classNames } from '../../utils/classNames';
import { string_css_class } from '../../utils/typeAliases';
import { Center } from '../Center/Center';
import styles from './UploadZone.module.css';

interface UploadZoneProps {
    /**
     * If true, clicking on UploadZone will open file selection dialog
     */
    isClickable?: boolean;
    onFilesOver?: (isFileOver: boolean) => void;
    onFiles: (droppedFiles: File[]) => void;

    /**
     * Content of the UploadZone
     */
    children: ReactNode;

    /**
     * If true, multiple files can be selected
     */
    isMultipleAllowed: boolean;

    /**
     * The accept attribute takes as its value a comma-separated list of one or more file types, or unique file type specifiers, describing which file types to allow.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept
     */
    accept?: string;

    /**
     * Optional CSS class name which will be added to root element
     */
    className?: string_css_class;
}

export function UploadZone(props: UploadZoneProps) {
    const { children, isClickable, onFilesOver, onFiles, isMultipleAllowed, accept, className } = props;
    const [isFilesOver, setFilesOver] = useState(false);

    const onFileOverWrapper = (isFileOver: boolean) => {
        setFilesOver(isFileOver);

        if (onFilesOver) {
            onFilesOver(isFileOver);
        }
    };

    let uploadClick: () => void;

    return (
        <div
            className={classNames(className, styles.UploadZone, isFilesOver ? styles.filesOver : '')}
            onClick={() => {
                if (isClickable) {
                    uploadClick();
                }
            }}
            onMouseEnter={() => {
                onFileOverWrapper(true);
            }}
            onMouseLeave={() => {
                onFileOverWrapper(false);
            }}
            onDragEnter={(event) => {
                event.stopPropagation();
                event.preventDefault();
            }}
            onDragOver={(event) => {
                event.stopPropagation();
                event.preventDefault();
                onFileOverWrapper(true);
            }}
            onDragExit={(event) => {
                event.stopPropagation();
                event.preventDefault();
                onFileOverWrapper(false);
            }}
            onDragEnd={(event) => {
                event.stopPropagation();
                event.preventDefault();
                onFileOverWrapper(false);
            }}
            onDragEndCapture={(event) => {
                event.stopPropagation();
                event.preventDefault();
                onFileOverWrapper(false);
            }}
            onDrop={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onFileOverWrapper(false);

                const files = Array.from(event.dataTransfer.files); // TODO: @hejny Maybe there should be event.dataTransfer.items handler
                onFiles(files);
            }}
        >
            <input
                type="file"
                multiple={isMultipleAllowed}
                ref={(element) => {
                    if (element) {
                        uploadClick = () => {
                            onFileOverWrapper(true);
                            (element as HTMLInputElement).value = '';
                            (element as HTMLInputElement).click();
                        };
                    }
                }}
                onChange={(event) => {
                    if (!event || !event.target || !event.target.files) return;
                    onFiles(Array.from(event.target.files));
                }}
                {...{ accept }}
            />
            <Center className={styles.inner}>{children}</Center>
        </div>
    );
}

/**
 * TODO: !!! Use <CreateZone/> inside <UploadZone/> to make it more reusable
 * TODO: Probbably when there is only one UploadZone rendered on entire page, expand invisible dropzone to full page
 * TODO: Allow to recieve item from Clipboard
 */
