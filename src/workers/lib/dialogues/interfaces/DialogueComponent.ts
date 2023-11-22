import { string_name } from '@promptbook/types';
import { DialogueComponentProps } from './DialogueComponentProps';

export interface DialogueComponent<TRequest, TResponse> {
    dialogueTypeName: string_name;
    (promps: DialogueComponentProps<TRequest, TResponse>): JSX.Element | null;
}

/**
 * TODO: !!! Annotate
 */
