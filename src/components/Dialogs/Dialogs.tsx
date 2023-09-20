import { useEffect, useRef, useState } from 'react';
import { Modal } from '../Modal/00-Modal';
import styles from './Dialogs.module.css';
import type { CommonDialogInQueue } from './interfaces/CommonDialogInQueue';
import { isDialogsRendered } from './locks/isDialogsRendered';
import { promptDialogQueue } from './queues/prompts';

/**
 * Renders a place where the dialogs are rendered
 *
 * The component is initially hidden and is shown when the first dialog is rendered
 * Note: There can be only one instance of this component in the app
 */
export function Dialogs() {
    useEffect(
        () => {
            if (isDialogsRendered.value === true) {
                throw new Error('There can be only one instance of TasksInProgress in the app');
            }
            isDialogsRendered.value = true;
            return () => {
                isDialogsRendered.value = false;
            };
        },
        [
            // Note: Check only once on mount
        ],
    );

    const [currentCommonDialogInQueue, setCurrentCommonDialogInQueue] = useState<null | CommonDialogInQueue>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (currentCommonDialogInQueue) {
            return;
        }

        const interval = setInterval(() => {
            const promptInQueue = promptDialogQueue.find((promptInQueue) => promptInQueue.answer === undefined);

            if (!promptInQueue) {
                return;
            }

            setCurrentCommonDialogInQueue(promptInQueue);
            if (textareaRef.current) {
                textareaRef.current.value = promptInQueue.defaultValue || '';
            }
        }, 50 /* <- TODO: DIALOG_POLLING_INTERVAL_MS into config */);

        return () => {
            clearInterval(interval);
        };
    }, [currentCommonDialogInQueue, textareaRef]);

    if (!currentCommonDialogInQueue) {
        return null;
    }

    return (
        <Modal
            title={currentCommonDialogInQueue.title}
            isCloseable={currentCommonDialogInQueue.isCloseable}
            onClose={() => {
                currentCommonDialogInQueue.answer = null;
                setCurrentCommonDialogInQueue(null);
            }}
        >
            {currentCommonDialogInQueue.message && (
                <div className={styles.message}>{currentCommonDialogInQueue.message}</div>
            )}
            <textarea
                autoFocus
                ref={textareaRef}
                defaultValue={currentCommonDialogInQueue.defaultValue || ''}
                placeholder={currentCommonDialogInQueue.placeholder || ''}
                className={styles.answer}
                onKeyDown={(event) => {
                    // TODO: DRY [1]
                    if (!(event.key === 'Enter' && event.shiftKey === false && event.ctrlKey === false)) {
                        return;
                    }

                    currentCommonDialogInQueue.answer = event.currentTarget.value;
                    setCurrentCommonDialogInQueue(null);
                }}
            />
            <button
                className={styles.submit}
                onClick={() => {
                    // TODO: DRY [1]
                    currentCommonDialogInQueue.answer = textareaRef.current!.value;
                    setCurrentCommonDialogInQueue(null);
                }}
            >
                Submit
            </button>
        </Modal>
    );
}

/**
 * TODO: !! Is overy answer recorded and in order?
 * TODO: Spelling dialog vs dialog ACRY
 * TODO: [🔏] DRY Locking mechanism | useLock hook
 * TODO: [🥧] Behave as popup window which can be multiple at once
 */
