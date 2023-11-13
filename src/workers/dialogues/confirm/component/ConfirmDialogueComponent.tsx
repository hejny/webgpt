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
            <button
                className={styles.option}
                onClick={() => {
                    onResponse({ answer: true });
                }}
            >
                Yes
            </button>
            <button
                className={styles.option}
                onClick={() => {
                    onResponse({ answer: false });
                }}
            >
                No
            </button>
        </>
    );
}

ConfirmDialogueComponent.dialogueTypeName = 'CONFIRM';

/**
 * !!! Allow to pass true/false labels
 * !!! Design
 * !!! Annotate
 */
