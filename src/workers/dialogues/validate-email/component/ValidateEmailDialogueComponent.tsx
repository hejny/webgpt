import { ClientVerificationComponent } from '../../../../components/ClientVerificationComponent/ClientVerificationComponent';
import { Modal } from '../../../../components/Modal/00-Modal';
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
    const { respond } = props;

    return (
        <Modal title={`Please write your email` /* <- !! Translate */}>
            <ClientVerificationComponent onVerificationSuccess={respond} />
        </Modal>
    );
}

ValidateEmailDialogueComponent.dialogueTypeName = 'VALIDATE_EMAIL';
