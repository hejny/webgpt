import { uuid } from '../../../utils/typeAliases';

export interface IMessageDialogueResponse {
    readonly type: `${string}_DIALOGUE_RESPONSE`;
    readonly id: uuid;
    readonly response: any;
}
