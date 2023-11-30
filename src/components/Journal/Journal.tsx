import { CSSProperties, useReducer } from 'react';
import { Promisable } from 'type-fest';
import { v4 } from 'uuid';
import { removeMarkdownFormatting } from '../../utils/content/removeMarkdownFormatting';
import { string_css_class, string_translate_language } from '../../utils/typeAliases';
import { speak } from '../../utils/voice/speak';
import { Chat } from './Chat/Chat';
import { ChatMessage, CompleteChatMessage, TeacherChatMessage } from './interfaces/ChatMessage';

const spoken = new Set<string>(/* <- TODO: Make instead some SpeechManager */);

interface JournalProps {
    /**
     * Determines whether the voice recognition and speech is enabled
     */
    isVoiceEnabled?: true;

    /**
     * The language code to use for voice recognition (e.g. "en").
     */
    voiceLanguage?: string_translate_language;

    /**
     * Called when user sends a message
     * You can reply via this function asynchronnously
     */
    onMessage(
        messageContent: string /* <- TODO: [🍗] Pass here the message object NOT just text */,
    ): Promisable<string /* <- TODO: [🍗] Pass here the message object NOT just text */>;

    // TODO: !!! runDeamon

    /**
     * Optional CSS class name which will be added to root <Chat/> component
     */
    className?: string_css_class;

    /**
     * Optional CSS  style which will be added to root <Chat/> component
     */
    style?: CSSProperties;
}

/**
 * Renders a chat with messages and input for new messages
 *
 * Note: There are two components:
 * - <Chat/> renders chat as it is without any logic - messages you pass as props are rendered as they are
 * - <Journal/> renders a chat with some logic - it manages messages, optionally speaks them, etc.
 *
 * Use <Journal/> in most cases.
 */
export function Journal(props: JournalProps) {
    const { isVoiceEnabled, voiceLanguage = 'en', onMessage, className, style } = props;

    const [messages, messagesDispatch] = useReducer(
        (messages: Array<ChatMessage>, action: { type: 'ADD'; message: ChatMessage }) => {
            switch (action.type) {
                case 'ADD':
                    if (
                        !spoken.has(action.message.id) &&
                        action.message.from === 'JOURNAL' &&
                        action.message.isComplete /* <- TODO: !!! SPEAK fluently NOT just when complete */
                    ) {
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

    /*
    TODO: !!! Use for runDeamon>
    useEffect(() => {
        // console.log(`useEffect`, `socket.on chatResponse`);
        // !!! Call off on to listener on useEffect destroy

        const listener = (replyMessage: JournalChatMessage) => {
            // console.log('chatResponse', replyMessage.id, replyMessage.content);
            messagesDispatch({
                type: 'ADD',
                message: {
                    ...replyMessage,
                    date: new Date(
                        replyMessage.date,
                    ) /* <- TODO: Some smarter hydration of unserializable JSON types * /,
                },
            });

        };
        socket.on('chatResponse', listener);
        return () => void socket.off('chatResponse', listener);
    });
    */

    return (
        <Chat
            {...{ messages, voiceLanguage, className, style }}
            isVoiceRecognitionButtonShown={isVoiceEnabled}
            onMessage={async (teacherMessageContent /* <- TODO: [🍗] Pass here the message object NOT just text */) => {
                const myMessage: TeacherChatMessage & CompleteChatMessage = {
                    id: v4(),
                    date: new Date() /* <- TODO: Rename+split into created+modified */,
                    from: 'TEACHER',
                    content: teacherMessageContent,
                    isComplete: true,
                };

                messagesDispatch({ type: 'ADD', message: myMessage });
                const journalMessageContent = await onMessage(teacherMessageContent);

                messagesDispatch({
                    type: 'ADD',
                    message: {
                        id: v4(),
                        date: new Date() /* <- TODO: Rename+split into created+modified */,
                        from: 'JOURNAL',
                        content: journalMessageContent,
                        isComplete: true,
                    },
                });
            }}
        />
    );
}

/**
 * TODO: Driver to handle sockets
 * TODO: !! Pick a voice
 * TODO: !! Voice is working with markdown
 * TODO: !! HighLight during a speech
 * TODO: !! Allow to listen without need to press a button
 * TODO: !! Imitate conversation
 * TODO: Use momentjs for dates
 * TODO: !!! Change TEACHER + JOURNAL branding, image,... to WebGPT style
 * TODO: !!! Buttons in WebGPT style
 */
