import { uuid } from '../../../../../../../../../utils/typeAliases';
import { Prompt } from '../../../../types/Prompt';

export interface Ptps_Request {
    clientId: uuid;
    prompt: Prompt;
}
