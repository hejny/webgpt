import { string_name } from '@promptbook/types';
import { DialogueComponent } from './DialogueComponent';

export type DialogueFunction<TRequest, TResponse> = {
    dialogueTypeName: string_name;
    DialogueComponent: DialogueComponent<TRequest, TResponse>;
} & ((request: TRequest) => Promise<TResponse>);

/**
 * TODO: !!!! Change to interface with call type
 * !!! Annotate
 */
