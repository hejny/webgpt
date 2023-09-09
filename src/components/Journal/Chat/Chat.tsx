import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import spaceTrim from 'spacetrim';
import { Promisable } from 'type-fest';
import journalAvatar from '../../../../public/people/journal.jpeg';
import teacherAvatar from '../../../../public/people/teacher.jpeg';
import { classNames } from '../../../utils/classNames';
import { focusRef } from '../../../utils/focusRef';
import { string_translate_language } from '../../../utils/typeAliases';
import { MarkdownContent } from '../../MarkdownContent/MarkdownContent';
import { ChatMessage } from '../interfaces/ChatMessage';
import { VoiceRecognitionButton } from '../VoiceRecognitionButton/VoiceRecognitionButton';
import styles from './Chat.module.css';

interface ChatProps {
    /**
     * Messages to render - they are rendered as they are
     */
    messages: Array<ChatMessage>;

    /**
     * Called when user sends a message
     *
     * Note: You must handle the message yourself and add it to the `messages` array
     */
    onMessage(messageContent: string /* <- TODO: [🍗] Pass here the message object NOT just text */): Promisable<void>;

    /**
     * Determines whether the voice recognition button is rendered
     */
    isVoiceRecognitionButtonShown?: true;

    /**
     * The language code to use for voice recognition (e.g. "en").
     */
    voiceLanguage?: string_translate_language;
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
export function Chat(props: ChatProps) {
    const { messages, onMessage, isVoiceRecognitionButtonShown, voiceLanguage = 'en' } = props;

    const [isAutoScrolling, setAutoScrolling] = useState(true);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const buttonSendRef = useRef<HTMLButtonElement | null>(null);

    useEffect(
        (/* Focus textarea on page load */) => {
            if (!textareaRef.current) {
                return;
            }
            textareaRef.current.focus();
        },
        [textareaRef],
    );

    const handleSend = async () => {
        const textareaElement = textareaRef.current;
        const buttonSendElement = buttonSendRef.current;

        if (!textareaElement) {
            throw new Error(`Can not find textarea`);
        }
        if (!buttonSendElement) {
            throw new Error(`Can not find textarea`);
        }

        textareaElement.disabled = true;
        buttonSendElement.disabled = true;

        try {
            if (spaceTrim(textareaElement.value) === '') {
                throw new Error(`You need to write some text`);
            }

            await onMessage(textareaElement.value);

            textareaElement.value = '';
            textareaElement.focus();
        } catch (error) {
            if (!(error instanceof Error)) {
                throw error;
            }

            console.error(error);
            alert(error.message);
        } finally {
            textareaElement.disabled = false;
            buttonSendElement.disabled = false;
            focusRef(textareaElement);
        }
    };

    return (
        <div className={styles.Chat}>
            <div
                className={styles.chatMessages}
                ref={(element) => {
                    if (!element) {
                        return;
                    }

                    if (!isAutoScrolling) {
                        return;
                    }

                    element.scrollBy(0, 10000);
                }}
                onScroll={(event) => {
                    const element = event.target;

                    if (!(element instanceof HTMLDivElement)) {
                        return;
                    }

                    setAutoScrolling(element.scrollTop + element.clientHeight === element.scrollHeight);
                }}
            >
                {messages.map((message, i) => (
                    <div
                        key={i}
                        className={classNames(styles.chatMessage, message.from === 'TEACHER' && styles.sender)}
                        onClick={() => console.info(message)}
                    >
                        <div className={styles.avatar}>
                            <Image
                                src={{ JOURNAL: journalAvatar, TEACHER: teacherAvatar }[message.from]}
                                alt={`AI generated image of ${message.from.toLocaleLowerCase()} as small cartoon avatar`}
                            />
                        </div>

                        <div className={styles.messageText}>
                            {/* <pre>{JSON.stringify(message, null, 4)}</pre> */}
                            <MarkdownContent
                                /* TODO: className={styles.messageText} */ {...{ content: message.content }}

                                /*
                                TODO: !!!
                                isSpoken={
                                    message.isComplete /* <- TODO: !!! Spoke fluently as the tokens go on MAKE some SpeechManager/SpeechSystem * / &&
                                    message.from === 'JOURNAL'
                                }
                                */
                            />
                        </div>
                    </div>
                ))}
            </div>

            {!isAutoScrolling && (
                <button
                    className={styles.scrollToBottom}
                    onClick={(event) => {
                        const chatMessagesElement = (event.target as HTMLDivElement)
                            .previousElementSibling as HTMLDivElement;
                        chatMessagesElement.style.scrollBehavior = 'smooth';
                        chatMessagesElement.scrollBy(0, 10000);
                        chatMessagesElement.style.scrollBehavior = 'auto';
                    }}
                >
                    ↓
                </button>
            )}

            <div className={styles.chatInput}>
                <textarea
                    ref={(element) => {
                        // TODO: [🍘] Use joinRefs
                        focusRef(element);
                        textareaRef.current = element;
                    }}
                    // defaultValue={INITIAL_TEACHER_MESSAGE_TEXT /* <- !!! Do not use this just as a placeholder */}
                    // TODO: placeholder={INITIAL_TEACHER_MESSAGE_TEXT}
                    onKeyDown={(event) => {
                        if (event.shiftKey) {
                            return;
                        }
                        if (event.key !== 'Enter') {
                            return;
                        }

                        event.preventDefault();
                        /* not await */ handleSend();
                    }}
                />
                <button ref={buttonSendRef} onClick={/* not await */ handleSend}>
                    Send
                </button>

                {isVoiceRecognitionButtonShown && <VoiceRecognitionButton {...{ textareaRef, voiceLanguage }} />}
            </div>
        </div>
    );
}

/**
 * TODO: !!! Autofocus
 */
