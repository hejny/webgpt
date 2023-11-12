import { string_name } from '@promptbook/types';

/**
 * !!! Update + Annotate all
 * Queue of prompt dialogues that are waiting for an answer
 *
 * @private Use only withing the folder Dialogues
 */
export const dialoguesQueue: Array<{
    dialogueTypeName: string_name;
    request: any;
    response?: any;
}> = [];

/**
 * TODO: !! Make some better type for dialogue request+response
 */
