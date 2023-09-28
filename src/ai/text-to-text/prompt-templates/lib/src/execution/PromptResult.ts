import { string_model_name } from '../../../../../../utils/typeAliases';
import { PromptTemplateParams } from '../types/PromptTemplateParams';
import { PtpExecutor } from './PtpExecutor';

export interface PromptResult {
    response: string;
    model: string_model_name;
}

export interface PromptChatResult extends PromptResult {
    continue: PtpExecutor<PromptTemplateParams, PromptTemplateParams>;
}

/**
 * TODO: [🧠] Add tokens, spent, time, etc.
 */
