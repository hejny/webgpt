import { ChatThread } from '../../../../ChatThread';
import { Prompt } from '../classes/Prompt';

export interface PromptingExecutionTools {
    gpt: {
        createChatThread(prompt: Prompt): Promise<ChatThread>;
        // TODO: [⛱]> completeWithGpt(prompt: Prompt<'COMPLETION'>): Promise<ICompleteWithGptResult>;
    };
}

/**
 * TODO: Add here prompts to user, eval emulator, logs and all other dependencies
 * TODO: [🧠] Should or should not there be a word "GPT" in both createChatThread and completeWithGpt
 */
