import { string_name } from '@promptbook/types';
import { ReactNode } from 'react';
import { DialogueComponentProps } from './DialogueComponentProps';

export type DialogueComponent<TRequest, TResponse> = { dialogueTypeName: string_name } & ((
    promps: DialogueComponentProps<TRequest, TResponse>,
) => ReactNode);

/**
 * !!! Annotate
 */
