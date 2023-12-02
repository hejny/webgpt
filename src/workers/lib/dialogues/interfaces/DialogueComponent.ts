import { string_name } from '@promptbook/types';
import { AbstractDialogueRequest } from './AbstractDialogueRequest';
import { AbstractDialogueResponse } from './AbstractDialogueResponse';
import { DialogueComponentProps } from './DialogueComponentProps';

/**
 * DialogueComponent is a React component that renders a dialogue (in most cases the <Modal/>) and exposes additional information about the dialogue.
 */
export interface DialogueComponent<TRequest extends AbstractDialogueRequest, TResponse extends AbstractDialogueResponse> {
    /**
     * The unique name of the dialogue to identify it.
     */
    dialogueTypeName: string_name;

    (promps: DialogueComponentProps<TRequest, TResponse>): JSX.Element | null;
}
