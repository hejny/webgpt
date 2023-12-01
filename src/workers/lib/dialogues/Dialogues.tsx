import { useEffect, useState } from 'react';
import { dialoguesQueue } from './dialoguesQueue';
import type { DialogueFunction } from './interfaces/DialogueFunction';
import type { DialogueRequestInQueue } from './interfaces/DialogueRequestInQueue';
import { isDialoguesRendered } from './isDialoguesRendered';

interface DialoguesProps {
    /**
     * Which dialogues are supported/rendered by the <Dialogues/> component
     */
    supportDialogues: Array<DialogueFunction<any, any>>;
}

/**
 * Renders a place where the dialogues are rendered
 *
 * The component is initially hidden and is shown when the first dialogue is rendered
 * Note: There can be only one instance of this component in the app
 */
export function Dialogues(props: DialoguesProps) {
    // TODO: Make hook useLock
    useEffect(
        () => {
            if (isDialoguesRendered.value === true) {
                throw new Error('There can be only one instance of Dialogues!!! in the app');
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

    // TODO: !!! DRY OR Better polling solution
    const [currentDialogueRequestInQueue, setCurrentDialogueRequestInQueue] = useState<null | DialogueRequestInQueue>(
        null,
    );
    useEffect(() => {
        if (currentDialogueRequestInQueue) {
            return;
        }

        const interval = setInterval(() => {
            const dialogueRequestInQueue = dialoguesQueue.find((promptInQueue) => promptInQueue.response === undefined);

            if (!dialogueRequestInQueue) {
                return;
            }

            setCurrentDialogueRequestInQueue(dialogueRequestInQueue);
        }, 50 /* <- TODO: POLLING_INTERVAL_MS into config */);

        return () => {
            clearInterval(interval);
        };
    }, [currentDialogueRequestInQueue]);

    if (!currentDialogueRequestInQueue) {
        return null;
    }

    const dialogueTypeName = currentDialogueRequestInQueue.dialogueTypeName;

    const dialogueFunction = props.supportDialogues.find(
        (dialogueFunction) => dialogueFunction.dialogueTypeName === dialogueTypeName,
    );

    if (!dialogueFunction) {
        console.error(
            new Error(
                `<Dialogues/> does not support dialogue "${dialogueTypeName}", did you forget to add it to props.supportDialogues?`,
            ),
            // <- TODO: Is it better to console.error new Error or just string?
        );
        return null;
    }

    const DialogueComponent = dialogueFunction.DialogueComponent;

    return (
        <DialogueComponent
            request={currentDialogueRequestInQueue.request}
            respond={(response) => {
                currentDialogueRequestInQueue.response = response;
                setCurrentDialogueRequestInQueue(null);
            }}
        />
    );
}

/**
 * TODO: Maybe use react portals to render the <Dialogues/>
 * TODO: !! Is overy answer recorded and in order?
 * TODO: Spelling dialog vs dialogue ACRY
 * TODO: [🔏] DRY Locking mechanism | useLock hook
 */
