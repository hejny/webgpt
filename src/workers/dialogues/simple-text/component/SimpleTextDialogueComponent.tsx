import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { Modal } from '../../../../components/Modal/00-Modal';
import { useStyleModule } from '../../../../utils/hooks/useStyleModule';
import type { DialogueComponentProps } from '../../../lib/dialogues/interfaces/DialogueComponentProps';
import { feedbackDialogue } from '../../feedback/feedbackDialogue';
import { FeedbackDialogueResponse } from '../../feedback/types/FeedbackDialogueResponse';
import type { SimpleTextDialogueRequest } from '../types/SimpleTextDialogueRequest';
import type { SimpleTextDialogueResponse } from '../types/SimpleTextDialogueResponse';

/**
 * Simple text dialogue offers a modal to the user to enter a (multiline) text.
 *
 * @private use only within simpleTextDialogue function
 */
export function SimpleTextDialogueComponent(
    props: DialogueComponentProps<SimpleTextDialogueRequest, SimpleTextDialogueResponse>,
) {
    const {
        request: { message, defaultValue, placeholder, isFeedbackCollected },
        respond: onResponse,
    } = props;

    const styles = useStyleModule(import('./SimpleTextDialogueComponent.module.css'));

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // TODO: !!! useFeedbackCollection hook OR <FeedbackCollectionButton/>
    // TODO: !!! Allow feedback trigger multiple times
    const [isInFeedbackCollection, setInFeedbackCollection] = useState(false);
    const [feedback, setSetFeedback] = useState<FeedbackDialogueResponse | undefined>();
    const triggerFeedbackCollection = useCallback(async () => {
        if (isInFeedbackCollection) {
            alert('Already in feedback collection');
            return;
        }

        setInFeedbackCollection(true);

        const subject = '!!!';
        setSetFeedback(
            await feedbackDialogue({
                message: `Feedback on ${subject}`,
                subject,
                // !!! Pass here defaultLikedStatus
                defaultValue: '',
                placeholder: 'Write your feedback here...',
            }),
        );

        setInFeedbackCollection(false);
    }, [isInFeedbackCollection]);

    const respond = useCallback(() => {
        onResponse({ answer: textareaRef.current!.value, feedback });
    }, [onResponse, textareaRef, feedback]);

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
                {isFeedbackCollected && (
                    <div className={styles.feedbackLayer}>
                        <button
                            // TODO: Maybe also listen on double-click on mobile
                            className={styles.triggerFeedback}
                            title={`Give feedback on !!!`}
                            onClick={triggerFeedbackCollection}
                        >
                            <Image alt="👍" src="/icons/openmoji/1F44D.black.svg" width={40} height={40} /* <-[🧥] */ />

                            {/* !!! Show here the reaction if given */}
                            {/* !!! Show here something better if reaction NOT given */}
                            {/* !!! Show here the hint */}
                            {/* <MarkdownContent content="👍" isUsingOpenmoji /> */}
                        </button>
                    </div>
                )}
            </div>
        </Modal>
    );
}

SimpleTextDialogueComponent.dialogueTypeName = 'SIMPLE_TEXT';
