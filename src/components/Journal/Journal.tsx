import { useReducer } from 'react';
import { v4 } from 'uuid';
import { Section } from '../../components/Section/Section';
import { removeMarkdownFormatting } from '../../utils/content/removeMarkdownFormatting';
import { Chat } from './Chat/Chat';
import { ChatMessage, CompleteChatMessage, TeacherChatMessage } from './interfaces/ChatMessage';
import styles from './Journal.module.css';
import { speak } from './utils/speak';

const spoken = new Set<string>(/* <- TODO: Make instead some SpeechManager */);

export function JournalSection() {
    const [messages, messagesDispatch] = useReducer(
        (messages: Array<ChatMessage>, action: { type: 'ADD'; message: ChatMessage }) => {
            // TODO: !!! Extract reducer to separate file
            switch (action.type) {
                case 'ADD':
                    if (
                        !spoken.has(action.message.id) &&
                        action.message.from === 'JOURNAL' &&
                        action.message.isComplete /* <- TODO: !!! SPEAK fluently NOT just when complete */
                    ) {
                        spoken.add(action.message.id);
                        speak(removeMarkdownFormatting(action.message.content), 'cs');
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
    TODO: !!! Remove>
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

            // TODO: !!! Translate to RxJS object
            // TODO: !!! Speech here
            // TODO: !!! Cancel this listener
        };
        socket.on('chatResponse', listener);
        return () => void socket.off('chatResponse', listener);
    });
    */

    return (
        <Section className={styles.JournalSection}>
            <h2>Chat</h2>

            <Chat
                {...{ messages }}
                onMessage={async (content /* <- TODO: !!! Pass here the message object NOT just text */) => {
                    const myMessage: TeacherChatMessage & CompleteChatMessage = {
                        id: v4(),
                        date: new Date() /* <- TODO: Rename+split into created+modified */,
                        from: 'TEACHER',
                        content,
                        isComplete: true,
                    };

                    messagesDispatch({ type: 'ADD', message: myMessage });
                    // !!! Remove> socket.emit('chatRequest', myMessage);
                }}
            />
            {/*<RecordForm/>*/}
        </Section>
    );
}

/**
 * TODO: Driver to handle sockets
 * TODO: !!! Pick a voice
 * TODO: !!! Voice is working with markdown
 * TODO: !!! Highlite during a speech
 * TODO: !!! Allow to listen
 * TODO: !!! Imitate conversation
 * TODO: !!! Use momentjs for dates
 * TODO: !!! (How) Should be initial message spoken?
 */
