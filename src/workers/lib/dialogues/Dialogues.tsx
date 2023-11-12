import { useEffect, useState } from 'react';
import { Modal } from '../../../components/Modal/00-Modal';
import { SimpleTextDialogueComponent } from './dialogues/simple-text/component/SimpleTextDialogueComponent';
import { IPromptInQueue } from './dialogues/simple-text/simpleTextDialogue';
import { isDialoguesRendered } from './misc/lock';
import { promptDialogueQueue } from './misc/dialoguesQueue';

/**
 * Renders a place where the dialogues are rendered
 *
 * The component is initially hidden and is shown when the first dialogue is rendered
 * Note: There can be only one instance of this component in the app
 */
export function Dialogues() {
    // TODO: Make hook useLock
    useEffect(
        () => {
            if (isDialoguesRendered.value === true) {
                throw new Error('There can be only one instance of Dialogues in the app');
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

    const [currentPromptInQueue, setCurrentPromptInQueue] = useState<null | IPromptInQueue>(null);

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

            /*
            !!! Move
            if (textareaRef.current) {
                textareaRef.current.value = promptInQueue.defaultValue || '';
            }
            */
        }, 50 /* <- TODO: POLLING_INTERVAL_MS into config */);

        return () => {
            clearInterval(interval);
        };
    }, [currentPromptInQueue]);

    if (!currentPromptInQueue) {
        return null;
    }

    return (
        <Modal title={currentPromptInQueue.prompt}>
            {/* !!! */}
            <SimpleTextDialogueComponent />
        </Modal>
    );
}

/**
 * TODO: Maybe use react portals to render the <Dialogues/>
 * TODO: !! Is overy answer recorded and in order?
 * TODO: Spelling dialog vs dialogue ACRY
 * TODO: [🔏] DRY Locking mechanism | useLock hook
 */
