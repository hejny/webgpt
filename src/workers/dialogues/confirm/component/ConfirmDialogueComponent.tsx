import { useRef } from 'react';
import { DialogueComponentProps } from '../../../lib/dialogues/interfaces/DialogueComponentProps';
import { ConfirmDialogueRequest } from '../interfaces/ConfirmDialogueRequest';
import { ConfirmDialogueResponse } from '../interfaces/ConfirmDialogueResponse';
import styles from './ConfirmDialogueComponent.module.css';

/**
 * @private use only within confirmDialogue function
 */
export function ConfirmDialogueComponent(
    props: DialogueComponentProps<ConfirmDialogueRequest, ConfirmDialogueResponse>,
) {
    const { request, onResponse } = props;

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    return (
        <>
            <textarea
                autoFocus
                ref={textareaRef}
                defaultValue={request.defaultValue || ''}
                placeholder={request.placeholder}
                className={styles.answer}
                onKeyDown={(event) => {
                    // TODO: DRY [1]
                    if (!(event.key === 'Enter' && event.shiftKey === false && event.ctrlKey === false)) {
                        return;
                    }

                    onResponse({ answer: event.currentTarget.value });
                    // TODO: !!! Move> setCurrentPromptInQueue(null);
                }}
            />
            <button
                className={styles.submit}
                onClick={() => {
                    // TODO: DRY [1]

                    onResponse({ answer: textareaRef.current!.value });
                    // TODO: !!! Move> setCurrentPromptInQueue(null);
                }}
            >
                Submit {/* <- !! Translate */}
            </button>
        </>
    );
}

ConfirmDialogueComponent.dialogueTypeName = 'SIMPLE_TEXT';

/**
 * !!! Annotate
 */
