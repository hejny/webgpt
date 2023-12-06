import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import spaceTrim from 'spacetrim';
import type { string_css_class, string_translate_language } from '../../../utils/typeAliases';
import type { SimpleTextDialogueRequest } from '../../../workers/dialogues/simple-text/types/SimpleTextDialogueRequest';
import type { SimpleTextDialogueResponse } from '../../../workers/dialogues/simple-text/types/SimpleTextDialogueResponse';
import { dialoguesQueue } from '../../../workers/lib/dialogues/dialoguesQueue';
import type { DialogueRequestInQueue } from '../../../workers/lib/dialogues/interfaces/DialogueRequestInQueue';
import { isDialoguesRendered } from '../../../workers/lib/dialogues/isDialoguesRendered';
import { SimpleChat } from '../SimpleChat/SimpleChat';

interface WorkerChatProps {
    /**
     * Determines whether the voice recognition and speech is enabled
     */
    isVoiceEnabled?: true;

    /**
     * The language code to use for voice recognition (e.g. "en").
     */
    voiceLanguage?: string_translate_language;

    /**
     * Optional initial message from bot to show
     */
    initialMessage?: string;

    /**
     * Called when user sends a message
     * You can reply via this function asynchronnously
     */
    workFunction(
        firstMessageFromUser: string,
        // TODO: !!! [🧠] Do we want mix taskProgress with WorkerChat?> onProgress: (taskProgress: WebgptTaskProgress) => Promisable<void>,
    ): Promise<never>;

    /**
     * Optional CSS class name which will be added to main <Chat/> component
     */
    className?: string_css_class;

    /**
     * Optional CSS  style which will be added to main <Chat/> component
     */
    style?: CSSProperties;
}

/**
 * Renders a chat which runs a async (worker) function on background and user interacts with it
 *
 * Note: There are few simmilar components:
 * - <Chat/> renders chat as it is without any logic - messages you pass as props are rendered as they are
 * - <SimpleChat/> renders a chat with some logic - it manages messages, optionally speaks them, etc.
 * - <WorkerChat/> renders a chat which runs a async (worker) function on background and user interacts with it
 *
 * Use <SimpleChat/> or <WorkerChat/> in most cases.
 */
export function WorkerChat(props: WorkerChatProps) {
    const { isVoiceEnabled, voiceLanguage, initialMessage, workFunction, className, style } = props;

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

    const [runningWork, setRunningWork] = useState<null | Promise<never>>(null);
    const currentDialogueRequestInQueueRef = useRef<null | DialogueRequestInQueue>(null);
    return (
        <SimpleChat
            {...{ isVoiceEnabled, voiceLanguage, initialMessage, className, style }}
            onMessage={async (userMessageContent) => {
                if (!runningWork) {
                    setRunningWork(
                        /* not await  */ workFunction(
                            userMessageContent,
                            // TODO: !!! [🧠] Do we want mix taskProgress with WorkerChat?> (taskProgress: WebgptTaskProgress) => {}
                        ),
                    );
                } else {
                    if (!currentDialogueRequestInQueueRef.current) {
                        throw new Error('currentDialogueRequestInQueueRef.current is null');
                        //               <- TODO: ShouldNeverHappenError
                    }
                    currentDialogueRequestInQueueRef.current.response = {
                        answer: userMessageContent,
                    } satisfies SimpleTextDialogueResponse;
                }

                console.log('!!!', 'Before await new Promise<DialogueRequestInQueue>');

                const currentDialogueRequestInQueue = await new Promise<DialogueRequestInQueue>((resolve) => {
                    // TODO: !!! React on signal DO not poll
                    const interval = setInterval(() => {
                        const dialogueRequestInQueue = dialoguesQueue.value.find(
                            (promptInQueue) => promptInQueue.response === undefined,
                        );

                        console.log('!!!', dialogueRequestInQueue);

                        if (!dialogueRequestInQueue) {
                            return;
                        }

                        resolve(dialogueRequestInQueue);
                        clearInterval(interval);
                    }, 50 /* <- TODO: POLLING_INTERVAL_MS into config */);
                });

                console.log('!!!', currentDialogueRequestInQueue);

                currentDialogueRequestInQueueRef.current = currentDialogueRequestInQueue;

                if (currentDialogueRequestInQueue.dialogueTypeName !== 'SIMPLE_TEXT') {
                    throw new Error(
                        spaceTrim(
                            (block) => `
                                In <WorkerChat/> you can only use SIMPLE_TEXT dialogue.
                                You are trying to use ${currentDialogueRequestInQueue.dialogueTypeName}.
                        `,
                        ),
                    );
                }

                const request: SimpleTextDialogueRequest = currentDialogueRequestInQueue.request;

                // TODO: !!! [🧠] Use in some inteligent way request.defaultValue

                return spaceTrim(
                    (block) => `
                   
                        ${block(request.message as string /* <- !!! Check that really string */)}

                        ${block(request.defaultValue as string /* <- !!! Check that really string */)}
                    
                    `,
                );
            }}
        />
    );
}

/**
 * TODO: [🍗]
 */
