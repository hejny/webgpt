import Image from 'next/image';
import { useCallback, useRef } from 'react';
import { Modal } from '../../../../components/Modal/00-Modal';
import { useStyleModule } from '../../../../utils/hooks/useStyleModule';
import type { DialogueComponentProps } from '../../../lib/dialogues/interfaces/DialogueComponentProps';
import type { SimpleTextDialogueRequest } from '../interfaces/SimpleTextDialogueRequest';
import type { SimpleTextDialogueResponse } from '../interfaces/SimpleTextDialogueResponse';

/**
 * Simple text dialogue offers a modal to the user to enter a (multiline) text.
 *
 * @private use only within simpleTextDialogue function
 */
export function SimpleTextDialogueComponent(
    props: DialogueComponentProps<SimpleTextDialogueRequest, SimpleTextDialogueResponse>,
) {
    const {
        request: { message, defaultValue, placeholder },
        respond: onResponse,
    } = props;

    const styles = useStyleModule(import('./SimpleTextDialogueComponent.module.css'));

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const respond = useCallback(() => {
        onResponse({ answer: textareaRef.current!.value });
    }, [onResponse, , textareaRef]);

    return (
        <Modal title={message}>
            {/* TODO: Maybe create some <OnTop><div/><div/></OnTop> component to make this type of layouts */}
            <div className={styles.inner}>
                <div className={styles.inputLayer}>
                    <textarea
                        autoFocus
                        ref={textareaRef}
                        defaultValue={defaultValue || ''}
                        placeholder={placeholder}
                        className={styles.answer}
                        onKeyDown={(event) => {
                            if (!(event.key === 'Enter' && event.shiftKey === false && event.ctrlKey === false)) {
                                return;
                            }

                            respond();
                        }}
                    />
                    <button className={styles.submit} onClick={respond}>
                        Submit {/* <- !! Translate */}
                    </button>
                </div>
                <div className={styles.feedbackLayer}>
                    <button
                        // TODO: Maybe also listen on double-click on mobile
                        className={styles.triggerFeedback}
                        title={`Give feedback on !!!`}
                        onClick={() => alert('TODO: Give feedback on !!!')}
                    >
                        <Image alt="👍" src="/icons/openmoji/1F44D.black.svg" width={40} height={40} /* <-[🧥] */ />
                        {/* <MarkdownContent content="👍" isUsingOpenmoji /> */}
                    </button>
                </div>
            </div>
        </Modal>
    );
}

SimpleTextDialogueComponent.dialogueTypeName = 'SIMPLE_TEXT';
