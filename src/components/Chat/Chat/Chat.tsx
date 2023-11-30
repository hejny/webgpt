import Image from 'next/image';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import spaceTrim from 'spacetrim';
import { Promisable } from 'type-fest';
import simpleChatAvatar from '../../../../public/avatars/bot.jpeg'; /* <- TODO: Use ACRY Import attributes> with { type: "???json" }; */
import teacherAvatar from '../../../../public/avatars/teacher.jpeg';
import { classNames } from '../../../utils/classNames';
import { focusRef } from '../../../utils/focusRef';
import { string_css_class, string_translate_language } from '../../../utils/typeAliases';
import { MarkdownContent } from '../../Content/MarkdownContent';
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

    /**
     * Optional CSS class name which will be added to root <div/> element
     */
    className?: string_css_class;

    /**
     * Optional CSS  style which will be added to root <div/> element
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
export function Chat(props: ChatProps) {
    const { messages, onMessage, isVoiceRecognitionButtonShown, voiceLanguage = 'en', className, style } = props;

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
        <div className={classNames(className, styles.Chat)} {...{ style }}>
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
                                src={{ JOURNAL: simpleChatAvatar, TEACHER: teacherAvatar }[message.from]}
                                alt={`AI generated image of ${message.from.toLocaleLowerCase()} as small cartoon avatar`}
                            />
                        </div>

                        <div className={styles.messageText}>
                            <MarkdownContent {...{ content: message.content }} />
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
                    placeholder={`Write a message`}
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