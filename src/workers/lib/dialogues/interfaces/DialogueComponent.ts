import { DialogueComponentProps } from './DialogueComponentProps';

export type DialogueComponent<TRequest, TResponse> = /* !!! Uncomment or remove { dialogueTypeName: string_name } &*/ (
    promps: DialogueComponentProps<TRequest, TResponse>,
) => JSX.Element | null;

/**
 * !!! Annotate
 */
