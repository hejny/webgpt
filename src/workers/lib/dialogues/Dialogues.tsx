import { useEffect } from 'react';
import { classNames } from '../../../utils/classNames';
import { dialoguesQueue } from './dialoguesQueue';
import type { AbstractDialogueRequest } from './interfaces/AbstractDialogueRequest';
import type { AbstractDialogueResponse } from './interfaces/AbstractDialogueResponse';
import type { DialogueFunction } from './interfaces/DialogueFunction';
import { isDialoguesRendered } from './isDialoguesRendered';

interface DialoguesProps {
    /**
     * Which dialogues are supported/rendered by the <Dialogues/> component
     */
    supportDialogues: Array<DialogueFunction<AbstractDialogueRequest, AbstractDialogueResponse>>;
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

    return (
        <div className={classNames('webgpt-controls')} data-debug="Dialogues">
            {dialoguesQueue.value
                .filter(({ response }) => response === undefined)
                .map(({ dialogueTypeName, id, request }) => {
                    const dialogueFunction = props.supportDialogues.find(
                        (dialogueFunction) => dialogueFunction.dialogueTypeName === dialogueTypeName,
                    );

                    if (!dialogueFunction) {
                        // TODO: [🧠] Some DRY solution to render errors/warning in UI
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
                        <div
                            key={id}
                            data-debug-type={dialogueTypeName}
                            data-debug-idx={id.split('-')[0]}
                            style={{
                                zIndex:
                                    (request.priority || 0) * 10 +
                                    10000 /* <- Note: To allow negative and float priority */ +
                                    200000 /* <- Note: To be at modal level z-index [🔝] Global z-index for wallpaper page */,
                            }}
                            // TODO: [🧠] Maybe allow to pass additional style+zIndex, className and key directly into every <DialogueComponent/> props
                        >
                            <DialogueComponent
                                key={id}
                                request={request}
                                respond={(response) => {
                                    const requestInQueue = dialoguesQueue.value.find(
                                        (requestInQueue) => requestInQueue.id === id,
                                    );

                                    if (!requestInQueue) {
                                        throw new Error('Request not found in queue');
                                    }

                                    const restRequestsInQueue = dialoguesQueue.value.filter(
                                        ({ id }) => requestInQueue.id !== id,
                                    );

                                    requestInQueue.response = response;

                                    dialoguesQueue.value = [...restRequestsInQueue, requestInQueue];
                                }}
                            />
                        </div>
                    );
                })}
        </div>
    );

    /*
    !!!last Remove + look in chat branch
    const [currentDialogueRequestInQueue, setCurrentDialogueRequestInQueue] = useState<null | DialogueRequestInQueue>(
        null,
    );

   
    useEffect(() => {
        if (currentDialogueRequestInQueue) {
            return;
        }

        const interval = setInterval(() => {
            const dialogueRequestInQueue = dialoguesQueue.value.find((promptInQueue) => promptInQueue.response === undefined);

            if (!dialogueRequestInQueue) {
                return;
            }

            setCurrentDialogueRequestInQueue(dialogueRequestInQueue);
        }, 50 /* <- TODO: POLLING_INTERVAL_MS into config * /);

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

    */
}

/**
 * TODO: Maybe use react portals to render the <Dialogues/>
 * TODO: !! Is overy answer recorded and in order?
 * TODO: Spelling dialog vs dialogue ACRY
 * TODO: [🔏] DRY Locking mechanism | useLock hook
 */
