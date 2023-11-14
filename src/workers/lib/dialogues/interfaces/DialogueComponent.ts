import { string_name } from '@promptbook/types';
import { DialogueComponentProps } from './DialogueComponentProps';

export type DialogueComponent<TRequest, TResponse> = { dialogueTypeName: string_name } & ((
    promps: DialogueComponentProps<TRequest, TResponse>,
) => JSX.Element | null);

/**
 * TODO: !!!! Change to interface with call type
 * !!! Annotate
 */
