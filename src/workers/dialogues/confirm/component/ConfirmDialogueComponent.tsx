import { useRef } from 'react';
import { Modal } from '../../../../components/Modal/00-Modal';
import { useStyleModule } from '../../../../utils/hooks/useStyleModule';
import { DialogueComponentProps } from '../../../lib/dialogues/interfaces/DialogueComponentProps';
import { ConfirmDialogueRequest } from '../interfaces/ConfirmDialogueRequest';
import { ConfirmDialogueResponse } from '../interfaces/ConfirmDialogueResponse';

/**
 * @private use only within confirmDialogue function
 */
export function ConfirmDialogueComponent(
    props: DialogueComponentProps<ConfirmDialogueRequest, ConfirmDialogueResponse>,
) {
    const {
        request: { message },
        onResponse,
    } = props;

    const styles = useStyleModule(import('./ConfirmDialogueComponent.module.css'));

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    return (
        <Modal title={message}>
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
        </Modal>
    );
}

ConfirmDialogueComponent.dialogueTypeName = 'CONFIRM';

/**
 * TODO: !! Allow to pass true/false labels
 * TODO: !! Design
 * TODO: !!! Annotate
 * TODO: !! Use some smaller format of <Modal/>
 * TODO: !! Allow multiple <ConfirmDialogueComponent/> to be rendered at once
 */
