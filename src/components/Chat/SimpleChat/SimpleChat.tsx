import { CSSProperties, useCallback, useReducer, useState } from 'react';
import { Promisable } from 'type-fest';
import { v4 } from 'uuid';
import { forTime } from 'waitasecond';
import { removeMarkdownFormatting } from '../../../utils/content/removeMarkdownFormatting';
import { string_css_class, string_translate_language } from '../../../utils/typeAliases';
import { speak } from '../../../utils/voice/speak';
import { Chat } from '../Chat/Chat';
import { ChatMessage, CompleteChatMessage, TeacherChatMessage } from '../interfaces/ChatMessage';

const spoken = new Set<string>(/* <- TODO: Make instead some SpeechManager */);

interface SimpleChatProps {
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
    initialMessage?: string /* <- TODO: [🍗] Pass here the message object NOT just text */;

    /**
     * Called when user sends a message
     * You can reply via this function asynchronnously
     */
    onMessage(
        messageContent: string /* <- TODO: [🍗] Pass here the message object NOT just text */,
    ): Promisable<string /* <- TODO: [🍗] Pass here the message object NOT just text */>;

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
 * Renders a chat with messages and input for new messages
 *
 * Note: There are two components:
 * - <Chat/> renders chat as it is without any logic - messages you pass as props are rendered as they are
 * - <SimpleChat/> renders a chat with some logic - it manages messages, optionally speaks them, etc.
 * - <WorkerChat/> renders a chat which runs a async (worker) function on background and user interacts with it
 *
 * Use <SimpleChat/> or <WorkerChat/> in most cases.
 */
export function SimpleChat(props: SimpleChatProps) {
    const { isVoiceEnabled, voiceLanguage = 'en', initialMessage, onMessage, className, style } = props;

    const [messages, messagesDispatch] = useReducer(
        (messages: Array<ChatMessage>, action: { type: 'ADD'; message: ChatMessage }) => {
            switch (action.type) {
                case 'ADD':
                    if (
                        !spoken.has(action.message.id) &&
                        action.message.from === 'JOURNAL' &&
                        action.message.isComplete /* <- TODO: !!! SPEAK fluently NOT just when complete */
                    ) {
                        // alert(`speaking ${action.message.content}`);
                        spoken.add(action.message.id);
                        if (isVoiceEnabled) {
                            speak(removeMarkdownFormatting(action.message.content), voiceLanguage);
                        }
                    }
                    return [...messages.filter((message) => message.id !== action.message.id), action.message].sort(
                        (message1, message2) => (message1.date.valueOf() > message2.date.valueOf() ? 1 : -1),
                    );

                default:
                    throw new Error(`Unknown action "${action.type}".`);
            }
        },
        [],
    );

    const [isInitialMessageSent, setInitialMessageSent] = useState<boolean | 'SENDING'>(false);
    const onUserInteraction = useCallback(async () => {
        // Note: Passing initial message from bot ex-post to:
        //       1) Speech is allowed after user interaction
        //       2) Avoid SSR
        //       3) DRY speech
        //       4) Make effect of initial thinking
        //       5) Make effect of typing

        if (initialMessage === undefined || isInitialMessageSent) {
            return;
        }

        setInitialMessageSent('SENDING');

        await forTime(300 /* <- TODO: !!! To config */);

        messagesDispatch({
            type: 'ADD',
            message: {
                id: v4(),
                date: new Date() /* <- TODO: Rename+split into created+modified */,
                from: 'JOURNAL',
                content: initialMessage,
                isComplete: true,
            },
        });

        setInitialMessageSent(true);
    }, [initialMessage, isInitialMessageSent]);

    return (
        <div onMouseDown={onUserInteraction}>
            <Chat
                {...{ messages, voiceLanguage, className, style }}
                isVoiceRecognitionButtonShown={isVoiceEnabled}
                onMessage={async (
                    userMessageContent /* <- TODO: [🍗] Pass here the message object NOT just text */,
                ) => {
                    const myMessage: TeacherChatMessage & CompleteChatMessage = {
                        id: v4(),
                        date: new Date() /* <- TODO: Rename+split into created+modified */,
                        from: 'TEACHER',
                        content: userMessageContent,
                        isComplete: true,
                    };

                    messagesDispatch({ type: 'ADD', message: myMessage });
                    const simpleChatMessageContent = await onMessage(userMessageContent);

                    messagesDispatch({
                        type: 'ADD',
                        message: {
                            id: v4(),
                            date: new Date() /* <- TODO: Rename+split into created+modified */,
                            from: 'JOURNAL',
                            content: simpleChatMessageContent,
                            isComplete: true,
                        },
                    });
                }}
            />
        </div>
    );
}

/**
 * TODO: !!! [🧠] Initial user interaction
 * TODO: Driver to handle sockets
 * TODO: !! Pick a voice
 * TODO: !! Voice is working with markdown
 * TODO: !! HighLight during a speech
 * TODO: !! Allow to listen without need to press a button
 * TODO: !! Imitate conversation
 * TODO: Use momentjs for dates
 * TODO: !!! Change TEACHER + JOURNAL branding, image,... to WebGPT style
 * TODO: !!! Buttons in WebGPT style
 * TODO: Extract speech logic into a separate component usable in both <SimpleChat/> or <AdvancedChat/>
 * TODO: [🧠] Thare should be some way how to send messages in different order than a,b,a,b,a,b,...
 *             Either put here some runDeamon prop
 *             Or create ChatThread with observable methods which will be passed into <InteractiveChat/> or <AdvancedChat/>
 *             > useEffect(() => {
 *             >     // console.log(`useEffect`, `socket.on chatResponse`);
 *             >     // !!! Call off on to listener on useEffect destroy
 *             >
 *             >     const listener = (replyMessage: SimpleChatChatMessage) => {
 *             >         // console.log('chatResponse', replyMessage.id, replyMessage.content);
 *             >         messagesDispatch({
 *             >             type: 'ADD',
 *             >             message: {
 *             >                 ...replyMessage,
 *             >                 date: new Date(
 *             >                     replyMessage.date,
 *             >                 ) /* <- TODO: Some smarter hydration of unserializable JSON types * /,
 *             >             },
 *             >         });
 *             >
 *             >     };
 *             >     socket.on('chatResponse', listener);
 *             >     return () => void socket.off('chatResponse', listener);
 *             > });
 */
