import { useRef } from 'react';
import { Modal } from '../../../../components/Modal/00-Modal';
import { useStyleModule } from '../../../../utils/hooks/useStyleModule';
import { DialogueComponentProps } from '../../../lib/dialogues/interfaces/DialogueComponentProps';
import { SimpleTextDialogueRequest } from '../interfaces/SimpleTextDialogueRequest';
import { SimpleTextDialogueResponse } from '../interfaces/SimpleTextDialogueResponse';

/**
 * @private use only within simpleTextDialogue function
 */
export function SimpleTextDialogueComponent(
    props: DialogueComponentProps<SimpleTextDialogueRequest, SimpleTextDialogueResponse>,
) {
    const {
        request: { message, defaultValue, placeholder },
        onResponse,
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

/**
 * TODO: !!! Annotate
 */
