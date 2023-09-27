import { ChatThread } from '../../../../ChatThread';
import { ICompleteWithGptResult } from '../../../../completeWithGpt';
import { Prompt } from '../classes/Prompt';

export interface PtpExecutionTools {
    gpt: {
        createChatThread(prompt: Prompt): Promise<ChatThread>;
        completeWithGpt(prompt: Prompt): Promise<ICompleteWithGptResult>;
    };
}

/**
 * TODO: Add here prompts to user, eval emulator, logs and all other dependencies
 * TODO: [🧠] Should or should not there be a word "GPT" in both createChatThread and completeWithGpt
 * TODO: [🧠] Maybe split PtpExecutionTools into PtpGptExecutionTools, PtpLogExecutionTools,...
 */
