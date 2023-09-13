import { useEffect, useState } from 'react';
import { message } from '../../utils/typeAliases';
import { Modal } from '../Modal/00-Modal';

/**
 * Represents a prompt message that is waiting for an answer or is already answered
 *
 * @private this should be used only withing this folder and subfolders
 */
export interface IPromptInQueue {
    /**
     * Prompt message
     */
    prompt: message;

    /**
     * Answer to the prompt
     *
     * - `undefined` means that the prompt is not answered yet and is waiting for an answer
     * - `null` means that the prompt is answered with `null`
     * - `string` means the answer to the prompt
     */
    answer: undefined | string | null;
}

/**
 * Queue of prompt dialogues that are waiting for an answer
 *
 * @private this should be used only withing this folder and subfolders
 */
export const promptDialogueQueue: Array<IPromptInQueue> = [];

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
        }, 50 /* <- TODO: POLLING_INTERVAL_MS into config */);

        return () => {
            clearInterval(interval);
        };
    });

    if (!currentPromptInQueue) {
        return null;
    }

    return (
        <Modal title={currentPromptInQueue.prompt}>
            <dialog>
                <input
                    autoFocus
                    type="text"
                    onKeyDown={(event) => {
                        if (event.key !== 'Enter') {
                            return;
                        }
                        const answer = event.currentTarget.value;

                        currentPromptInQueue.answer = answer || null;
                        setCurrentPromptInQueue(null);
                    }}
                />
            </dialog>
        </Modal>
    );
}

/**
 * TODO: Spelling dialog vs dialogue ACRY
 * TODO: Maybe implement promptDialogueQueue via Promise, React.Context, RxJS or something better than polling from singleton
 * TODO: [🔏] DRY Locking mechanism
 */
