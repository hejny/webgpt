import { useCallback, useRef, useState } from 'react';
import type { LikedStatus } from '../../../../ai/recommendation/LikedStatus';
import { LikedStatusInput } from '../../../../components/LikedStatusInput/LikedStatusInput';
import { Modal } from '../../../../components/Modal/00-Modal';
import { useStyleModule } from '../../../../utils/hooks/useStyleModule';
import type { DialogueComponentProps } from '../../../lib/dialogues/interfaces/DialogueComponentProps';
import type { FeedbackDialogueRequest } from '../types/FeedbackDialogueRequest';
import type { FeedbackDialogueResponse } from '../types/FeedbackDialogueResponse';

/**
 * Feedback dialogue offers a simple yes/no question to the user.
 *
 * @private use only within feedbackDialogue function
 */
export function FeedbackDialogueComponent(
    props: DialogueComponentProps<FeedbackDialogueRequest, FeedbackDialogueResponse>,
) {
    const {
        request: { message, subject, defaultLikedStatus, defaultNote, notePlaceholder, priority = 0 },
        respond,
    } = props;

    const styles = useStyleModule(import('./FeedbackDialogueComponent.module.css'));

    const [likedStatus, setLikedStatus] = useState<LikedStatus>(defaultLikedStatus);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const submit = useCallback(() => {
        respond({ likedStatus, note: textareaRef.current!.value });
    }, [respond, likedStatus, textareaRef]);

    return (
        <Modal title={message} size="MEDIUM" isCloseable closeModal={submit}>
            <div className={styles.inputLayer}>
                <LikedStatusInput
                    className={styles.likedStatus}
                    onLikedStatusChange={setLikedStatus}
                    {...{ likedStatus, subject }}
                />

                <textarea
                    autoFocus
                    ref={textareaRef}
                    defaultValue={defaultNote || ''}
                    placeholder={notePlaceholder || ''}
                    className={styles.answer}
                    onKeyDown={(event) => {
                        // TODO: DRY [1]
                        if (!(event.key === 'Enter' && event.shiftKey === false && event.ctrlKey === false)) {
                            return;
                        }

                        submit();
                    }}
                />
                <button className={styles.submit} onClick={submit}>
                    {/* <- !!! Button visible with mobile keyboard */}
                    Submit feedback on {subject} {/* <- !! Translate */}
                </button>
            </div>
        </Modal>
    );
}

FeedbackDialogueComponent.dialogueTypeName = 'FEEDBACK';

/**
 * TODO: !! Use some smaller format of <Modal/>
 */
