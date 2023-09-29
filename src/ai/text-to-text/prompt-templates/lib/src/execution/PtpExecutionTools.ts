import { Prompt } from '../classes/Prompt';
import { PromptChatResult } from './PromptResult';

export interface PtpExecutionTools {
    // TODO: !!!> Maybe just make one variant of ->gptComplete<-/gptChat and resolve from modelRequirements
    // TODO: !!!> gptComplete(prompt: Prompt): Promise<PromptResult>;
    gptChat(prompt: Prompt): Promise<PromptChatResult>;
}

/**
 * TODO: Add here prompts to user, eval emulator, logs and all other dependencies
 * TODO: [🧠] Should or should not there be a word "GPT" in both gptComplete and gptChat
 * TODO: [🧠] Maybe split PtpExecutionTools into PtpGptExecutionTools, PtpLogExecutionTools,...
 */
