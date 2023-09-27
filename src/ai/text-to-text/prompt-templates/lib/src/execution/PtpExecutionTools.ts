import { OpenAiChatGptThread } from '../../../../OpenAiChatGptThread';
import { Prompt } from '../classes/Prompt';
import { PromptResult } from './PromptResult';

export interface PtpExecutionTools {
    createChatThread(prompt: Prompt): Promise<OpenAiChatGptThread>;
    completeWithGpt(prompt: Prompt): Promise<PromptResult>;
}

/**
 * TODO: [🧠] Maybe include word GPT in createChatThread (as in createChatThread)
 * TODO: Add here prompts to user, eval emulator, logs and all other dependencies
 * TODO: [🧠] Should or should not there be a word "GPT" in both createChatThread and completeWithGpt
 * TODO: [🧠] Maybe split PtpExecutionTools into PtpGptExecutionTools, PtpLogExecutionTools,...
 */
