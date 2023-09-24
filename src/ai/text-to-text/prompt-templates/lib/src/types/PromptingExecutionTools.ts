import { ChatThread } from '../../../../ChatThread';
import { Prompt } from '../classes/Prompt';

export interface PromptingExecutionTools {
    gpt: {
        createChatThread(prompt: Prompt<'CHAT'>): Promise<ChatThread>;
        // TODO: [⛱]> completeWithGpt(prompt: Prompt<'COMPLETION'>): Promise<ICompleteWithGptResult>;
    };
}

/**
 * TODO: Add here prompts to user, eval emulator, logs and all other dependencies
 */
