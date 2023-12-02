import { string_name } from '@promptbook/types';
import type { DialogueComponentProps } from './DialogueComponentProps';

/**
 * DialogueComponent is a React component that renders a dialogue (in most cases the <Modal/>) and exposes additional information about the dialogue.
 */
export interface DialogueComponent<TRequest, TResponse> {
    /**
     * The unique name of the dialogue to identify it.
     */
    dialogueTypeName: string_name;

    (promps: DialogueComponentProps<TRequest, TResponse>): JSX.Element | null;
}
