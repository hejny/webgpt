import { Modal } from '../../../../components/Modal/00-Modal';
import { useStyleModule } from '../../../../utils/hooks/useStyleModule';
import type { DialogueComponentProps } from '../../../lib/dialogues/interfaces/DialogueComponentProps';
import type { ConfirmDialogueRequest } from '../types/ConfirmDialogueRequest';
import type { ConfirmDialogueResponse } from '../types/ConfirmDialogueResponse';

/**
 * Confirm dialogue offers a simple yes/no question to the user.
 *
 * @private use only within confirmDialogue function
 */
export function ConfirmDialogueComponent(
    props: DialogueComponentProps<ConfirmDialogueRequest, ConfirmDialogueResponse>,
) {
    const {
        request: { message, priority = 0 },
        respond,
    } = props;

    const styles = useStyleModule(import('./ConfirmDialogueComponent.module.css'));

    return (
        <Modal title={message}>
            <button
                className={styles.option}
                onClick={() => {
                    respond({ answer: true });
                }}
            >
                Yes
            </button>
            <button
                className={styles.option}
                onClick={() => {
                    respond({ answer: false });
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
 * TODO: !! Use some smaller format of <Modal/>
 * TODO: !! Allow multiple <ConfirmDialogueComponent/> to be rendered at once
 */
