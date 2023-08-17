import React from 'react';
import { classNames } from '../../utils/classNames';
import styles from './UploadZone.module.css';

export type IUploadZoneProps = React.PropsWithChildren<{
    isClickable?: boolean;
    onFilesOver?: (isFileOver: boolean) => void;
    onFiles: (droppedFiles: File[]) => void;
}>;

export function UploadZone({ children, isClickable, onFilesOver, onFiles }: IUploadZoneProps) {
    const [isFilesOver, setFilesOver] = React.useState(false);

    const onFileOverWrapper = (isFileOver: boolean) => {
        setFilesOver(isFileOver);

        if (onFilesOver) {
            onFilesOver(isFileOver);
        }
    };

    let uploadClick: () => void;

    return (
        <div
            className={classNames(styles.UploadZone, isFilesOver ? styles.filesOver : '')}
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
                multiple
                ref={(element) => {
                    if (element) {
                        uploadClick = () => {
                            onFileOverWrapper(true);
                            (element as HTMLInputElement).click();
                        };
                    }
                }}
                onChange={(event) => {
                    if (!event || !event.target || !event.target.files) return;
                    onFiles(Array.from(event.target.files));
                }}
            />
            {children}
            {/* TODO: !!! <Center className={styles.inner}>{children}</Center>*/}
        </div>
    );
}

/**
 * TODO: Probbably when there is only one UploadZone rendered on entire page, expand invisible dropzone to full page
 * TODO: Allow to recieve item from Clipboard
 */
