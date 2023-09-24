import { ChatThread } from '../../../ChatThread';
import { ICompleteWithGptResult } from '../../../completeWithGpt';
import { Prompt } from './Prompt';

export interface PromptingExecutionTools {
    gpt: {
        createChatThread(prompt: Prompt<'CHAT'>): Promise<ChatThread>;
        completeWithGpt(prompt: Prompt<'COMPLETION'>): Promise<ICompleteWithGptResult>;
    };
}

/**
 * TODO: Add here prompts to user, eval emulator, logs and all other dependencies
 */
