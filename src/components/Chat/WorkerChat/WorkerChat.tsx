import { CSSProperties } from 'react';
import { string_css_class, string_translate_language } from '../../../utils/typeAliases';
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

    return (
        <SimpleChat
            {...{ isVoiceEnabled, voiceLanguage, initialMessage, className, style }}
            onMessage={async (userMessageContent) => {
                // !!!
                workFunction(
                    userMessageContent,
                    // TODO: !!! [🧠] Do we want mix taskProgress with WorkerChat?> (taskProgress: WebgptTaskProgress) => {}
                );

                return 'Function running...';
            }}
        />
    );
}

/**
 * TODO: [🍗]
 */
