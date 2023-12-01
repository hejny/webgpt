import { useRef } from 'react';
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

    return (
        <Modal title={message}>
            <textarea
                autoFocus
                ref={textareaRef}
                defaultValue={defaultValue || ''}
                placeholder={placeholder}
                className={styles.answer}
                onKeyDown={(event) => {
                    // TODO: DRY [1]
                    if (!(event.key === 'Enter' && event.shiftKey === false && event.ctrlKey === false)) {
                        return;
                    }

                    onResponse({ answer: event.currentTarget.value });
                }}
            />
            <button
                className={styles.submit}
                onClick={() => {
                    // TODO: DRY [1]

                    onResponse({ answer: textareaRef.current!.value });
                }}
            >
                Submit {/* <- !! Translate */}
            </button>
        </Modal>
    );
}

SimpleTextDialogueComponent.dialogueTypeName = 'SIMPLE_TEXT';
