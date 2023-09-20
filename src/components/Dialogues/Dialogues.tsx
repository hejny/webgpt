import { useEffect, useRef, useState } from 'react';
import { Modal } from '../Modal/00-Modal';
import styles from './Dialogues.module.css';
import type { PromptInQueue } from './interfaces/PromptInQueue';
import { isDialoguesRendered } from './locks/Dialogues.lock';
import { promptDialogueQueue } from './queues/prompts';

/**
 * Renders a place where the dialogues are rendered
 *
 * The component is initially hidden and is shown when the first dialogue is rendered
 * Note: There can be only one instance of this component in the app
 */
export function Dialogues() {
    useEffect(
        () => {
            if (isDialoguesRendered.value === true) {
                throw new Error('There can be only one instance of TasksInProgress in the app');
            }
            isDialoguesRendered.value = true;
            return () => {
                isDialoguesRendered.value = false;
            };
        },
        [
            // Note: Check only once on mount
        ],
    );

    const [currentPromptInQueue, setCurrentPromptInQueue] = useState<null | PromptInQueue>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (currentPromptInQueue) {
            return;
        }

        const interval = setInterval(() => {
            const promptInQueue = promptDialogueQueue.find((promptInQueue) => promptInQueue.answer === undefined);

            if (!promptInQueue) {
                return;
            }

            setCurrentPromptInQueue(promptInQueue);
            if (textareaRef.current) {
                textareaRef.current.value = promptInQueue.defaultValue || '';
            }
        }, 50 /* <- TODO: POLLING_INTERVAL_MS into config */);

        return () => {
            clearInterval(interval);
        };
    }, [currentPromptInQueue, textareaRef]);

    if (!currentPromptInQueue) {
        return null;
    }

    return (
        <Modal title={currentPromptInQueue.prompt}>
            <textarea
                autoFocus
                ref={textareaRef}
                defaultValue={currentPromptInQueue.defaultValue || ''}
                placeholder={currentPromptInQueue.placeholder}
                className={styles.answer}
                onKeyDown={(event) => {
                    // TODO: DRY [1]
                    if (!(event.key === 'Enter' && event.shiftKey === false && event.ctrlKey === false)) {
                        return;
                    }

                    currentPromptInQueue.answer = event.currentTarget.value;
                    setCurrentPromptInQueue(null);
                }}
            />
            <button
                className={styles.submit}
                onClick={() => {
                    // TODO: DRY [1]
                    currentPromptInQueue.answer = textareaRef.current!.value;
                    setCurrentPromptInQueue(null);
                }}
            >
                Submit
            </button>
        </Modal>
    );
}

/**
 * TODO: !! Is overy answer recorded and in order?
 * TODO: Spelling dialog vs dialogue ACRY
 * TODO: [🔏] DRY Locking mechanism | useLock hook
 */
