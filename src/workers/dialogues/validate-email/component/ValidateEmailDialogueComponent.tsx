import { useCallback, useRef, useState } from 'react';
import type { Feedback } from '../../../../ai/recommendation/Feedback';
import { Modal } from '../../../../components/Modal/00-Modal';
import { useStyleModule } from '../../../../utils/hooks/useStyleModule';
import type { DialogueComponentProps } from '../../../lib/dialogues/interfaces/DialogueComponentProps';
import type { ValidateEmailDialogueRequest } from '../types/ValidateEmailDialogueRequest';
import type { ValidateEmailDialogueResponse } from '../types/ValidateEmailDialogueResponse';

/**
 * Simple text dialogue offers a modal to the user to enter a (multiline) text.
 *
 * @private use only within validateEmailDialogue function
 */
export function ValidateEmailDialogueComponent(
    props: DialogueComponentProps<ValidateEmailDialogueRequest, ValidateEmailDialogueResponse>,
) {
    const {
        request: { isVerifiedEmailRequired, priority = 0 },
        respond,
    } = props;

    const styles = useStyleModule(import('./ValidateEmailDialogueComponent.module.css'));

   

    const [feedback, setFeedback] = useState<Feedback | undefined>();
    const [isInFeedbackCollection, setInFeedbackCollection] = useState(false);

    const submit = useCallback(() => {
        respond({ answer: emailInputRef.current!.value, feedback });
    }, [respond, emailInputRef, feedback]);

    return (
        <Modal
            title={`Please write your email` /* <- !! Translate */}
            isDisabled={isInFeedbackCollection}
            isCloseable
            closeIcon="✔"
            onClose={submit}
        >
            {/* TODO: Maybe create some <OnTop><div/><div/></OnTop> component to make this type of layouts */}
            <div className={styles.inner}>
                <div className={styles.inputLayer}>
                    <input
                        autoFocus
                        ref={emailInputRef}
                        type="email"
                        defaultValue={`@`}
                        placeholder={`john.smith@gmail.com` /* <- !! Translate */}
                        className={styles.answer}
                        onKeyDown={(event) => {
                            if (!(event.key === 'Enter' && event.shiftKey === false && event.ctrlKey === false)) {
                                return;
                            }

                            submit();
                        }}
                    />
                    <button className={styles.submit} onClick={submit}>
                        {/* <- TODO: [🕶][☘] Button visible with mobile keyboard */}
                        Submit {/* <- !! Translate */}
                    </button>
                </div>
            </div>
        </Modal>
    );
}

ValidateEmailDialogueComponent.dialogueTypeName = 'VALIDATE_EMAIL';
