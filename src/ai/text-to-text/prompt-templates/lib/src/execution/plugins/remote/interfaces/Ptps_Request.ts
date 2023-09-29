import { uuid } from '../../../../../../../../../utils/typeAliases';
import { Prompt } from '../../../../classes/Prompt';

export interface Ptps_Request {
    clientId: uuid;
    prompt: Prompt;
}
