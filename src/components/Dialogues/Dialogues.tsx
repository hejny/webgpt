import { useEffect, useState } from 'react';
import { Modal } from '../Modal/00-Modal';
import styles from './Dialogues.module.css';
import { IPromptInQueue } from './dialogues/promptDialogue';
import { promptDialogueQueue } from './queues/prompts';

/**
 * Is <Dialogues/> component currently rendered
 * Is used to prevent multiple instances of Dialogues in the app
 * @private
 */
let isDialoguesRendered = false;

/**
 * Renders a place where the dialogues are rendered
 *
 * The component is initially hidden and is shown when the first dialogue is rendered
 * Note: There can be only one instance of this component in the app
 */
export function Dialogues() {
    useEffect(() => {
        if (isDialoguesRendered) {
            throw new Error('There can be only one instance of TasksInProgress in the app');
        }
        isDialoguesRendered = true;
        return () => {
            isDialoguesRendered = false;
        };
    });

    const [currentPromptInQueue, setCurrentPromptInQueue] = useState<null | IPromptInQueue>(null);
    useEffect(() => {
        const interval = setInterval(() => {
            const promptInQueue = promptDialogueQueue.find((promptInQueue) => promptInQueue.answer === undefined);

            if (!promptInQueue) {
                return;
            }

            setCurrentPromptInQueue(promptInQueue);
            setAnswer(promptInQueue.answer!);
        }, 50 /* <- TODO: POLLING_INTERVAL_MS into config */);

        return () => {
            clearInterval(interval);
        };
    });

    const [answer, setAnswer] = useState<null | string>(null);

    if (!currentPromptInQueue) {
        return null;
    }

    return (
        <Modal title={currentPromptInQueue.prompt}>
            <textarea
                autoFocus
                defaultValue={answer || ''}
                placeholder={currentPromptInQueue.placeholder}
                className={styles.answer}
                onChange={(event) => {
                    setAnswer(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                    // TODO: DRY [1]
                    if (!(event.key === 'Enter' && event.shiftKey === false && event.ctrlKey === false)) {
                        return;
                    }

                    const answer = event.currentTarget.value;
                    currentPromptInQueue.answer = answer;
                    setCurrentPromptInQueue(null);
                }}
            />
            <button
                className={styles.submit}
                onClick={() => {
                    // TODO: DRY [1]
                    currentPromptInQueue.answer = answer;
                    setCurrentPromptInQueue(null);
                }}
            >
                Submit
            </button>
        </Modal>
    );
}

/**
 * TODO: !!! Is overy answer recorded and in order?
 * TODO: Spelling dialog vs dialogue ACRY
 * TODO: [🔏] DRY Locking mechanism
 */
