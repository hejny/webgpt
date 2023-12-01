import { useCallback, useRef } from 'react';
import { Modal } from '../../../../components/Modal/00-Modal';
import { useStyleModule } from '../../../../utils/hooks/useStyleModule';
import { DialogueComponentProps } from '../../../lib/dialogues/interfaces/DialogueComponentProps';
import { SimpleTextDialogueRequest } from '../interfaces/SimpleTextDialogueRequest';
import { SimpleTextDialogueResponse } from '../interfaces/SimpleTextDialogueResponse';

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
        </Modal>
    );
}

SimpleTextDialogueComponent.dialogueTypeName = 'SIMPLE_TEXT';
