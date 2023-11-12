import { string_name } from '@promptbook/types';

export type DialogueFunction<TRequest, TResponse> = { dialogueTypeName: string_name } & ((
    request: TRequest,
) => Promise<TResponse>);

/**
 * !!! Annotate
 */
