import { Prompt } from '../classes/Prompt';
import { PromptChatResult, PromptResult } from './PromptResult';

export interface PtpExecutionTools {
    gptComplete(prompt: Prompt): Promise<PromptResult>;
    gptChat(prompt: Prompt): Promise<PromptChatResult>;
}

/**
 * TODO: [🧠] Maybe include word GPT in createChatThread (as in createChatThread)
 * TODO: Add here prompts to user, eval emulator, logs and all other dependencies
 * TODO: [🧠] Should or should not there be a word "GPT" in both createChatThread and completeWithGpt
 * TODO: [🧠] Maybe split PtpExecutionTools into PtpGptExecutionTools, PtpLogExecutionTools,...
 */
