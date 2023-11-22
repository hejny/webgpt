import { uuid } from '../../../utils/typeAliases';

export interface IMessageDialogueRequest {
    readonly type: `${string}_DIALOGUE_REQUEST`;
    readonly id: uuid;
    readonly request: any;
}
