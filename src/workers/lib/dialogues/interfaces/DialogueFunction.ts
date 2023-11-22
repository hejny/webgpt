import { string_name } from '@promptbook/types';
import { DialogueComponent } from './DialogueComponent';

export interface DialogueFunction<TRequest, TResponse> {
    dialogueTypeName: string_name;
    DialogueComponent: DialogueComponent<TRequest, TResponse>;
    (request: TRequest): Promise<TResponse>;
}

/**
 * TODO: !!! Annotate
 */
