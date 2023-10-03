import { Prompt } from '../types/Prompt';
import { PromptChatResult } from './PromptResult';

/**
 * Execution Tools is a container for all the tools needed to execute prompts (template pipelines).
 * On its interface it exposes common methods for prompt execution.
 * Inside (in constructor) it calls OpenAI, Azure, GPU, proxy, cache, logging,...
 *
 * @see https://github.com/hejny/ptp#execution-tools
 */
export interface PtpExecutionTools {
    // TODO: !!!> Maybe just make one variant of ->gptComplete<-/gptChat and resolve from modelRequirements
    // TODO: !!!> gptComplete(prompt: Prompt): Promise<PromptResult>;

    /**
     * Use a chat model
     */
    gptChat(prompt: Prompt): Promise<PromptChatResult>;
}

/**
 * TODO: Add here prompts to user, eval emulator, logs and all other dependencies
 * TODO: [🧠] Should or should not there be a word "GPT" in both gptComplete and gptChat
 * TODO: [🧠] Maybe split PtpExecutionTools into PtpGptExecutionTools, PtpLogExecutionTools,...
 */
