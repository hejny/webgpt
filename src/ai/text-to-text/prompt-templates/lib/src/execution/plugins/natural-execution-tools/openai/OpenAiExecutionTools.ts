import chalk from 'chalk';
import OpenAI from 'openai';
import { string_token } from '../../../../../../../../../utils/typeAliases';
import { Prompt } from '../../../../types/Prompt';
import { NaturalExecutionTools } from '../../../NaturalExecutionTools';
import { PromptChatResult, PromptCompletionResult } from '../../../PromptResult';

/**
 * Execution Tools for calling OpenAI API.
 */
export class OpenAiExecutionTools implements NaturalExecutionTools {
    /**
     * OpenAI API client.
     */
    private readonly openai: OpenAI;

    public constructor(openAiApiKey: string_token) {
        this.openai = new OpenAI({
            apiKey: openAiApiKey,
        });
    }

    /**
     * Calls OpenAI API to use a chat model.
     */
    public async gptChat(prompt: Prompt): Promise<PromptChatResult> {
        const { content, modelRequirements } = prompt;

        // TODO: [☂] Use here more modelRequirements
        if (modelRequirements.variant !== 'CHAT') {
            throw new Error(`Use gptChat only for CHAT variant`);
        }

        const model = 'gpt-3.5-turbo'; /* <- TODO: [☂] Use here more modelRequirements */
        const modelSettings = { model };
        const raw = await this.openai.chat.completions.create({
            ...modelSettings,
            messages: [
                {
                    role: 'user',
                    content,
                },
            ],
        });

        if (!raw.choices[0]) {
            console.error(chalk.bgRed('raw'), chalk.red(JSON.stringify(raw, null, 4)));
            throw new Error(`No choises from OpenAPI`);
        }

        if (raw.choices.length > 1) {
            // TODO: This should be maybe only warning
            console.error(chalk.bgRed('raw'), chalk.red(JSON.stringify(raw, null, 4)));
            throw new Error(`More than one choise from OpenAPI`);
        }

        const resultContent = raw.choices[0].message.content;

        if (!resultContent) {
            console.error(chalk.bgRed('raw'), chalk.red(JSON.stringify(raw, null, 4)));
            throw new Error(`No response message from OpenAPI`);
        }

        return {
            content: resultContent,
            model,
            raw,
            // <- [🤹‍♂️]
        };
    }

    /**
     * Calls OpenAI API to use a complete model.
     */
    public async gptComplete(prompt: Prompt): Promise<PromptCompletionResult> {
        const { content, modelRequirements } = prompt;

        // TODO: [☂] Use here more modelRequirements
        if (modelRequirements.variant !== 'COMPLETION') {
            throw new Error(`Use gptComplete only for COMPLETION variant`);
        }

        const model = 'text-davinci-003'; /* <- TODO: [☂] Use here more modelRequirements */
        const modelSettings = { model };

        const raw = await this.openai.completions.create({
            ...modelSettings,
            prompt: content,
        });

        if (!raw.choices[0]) {
            console.error(chalk.bgRed('raw'), chalk.red(JSON.stringify(raw, null, 4)));
            throw new Error(`No choises from OpenAPI`);
        }

        if (raw.choices.length > 1) {
            // TODO: This should be maybe only warning
            console.error(chalk.bgRed('raw'), chalk.red(JSON.stringify(raw, null, 4)));
            throw new Error(`More than one choise from OpenAPI`);
        }

        const resultContent = raw.choices[0].text;

        if (!resultContent) {
            console.error(chalk.bgRed('raw'), chalk.red(JSON.stringify(raw, null, 4)));
            throw new Error(`No response message from OpenAPI`);
        }

        return {
            content: resultContent,
            model,
            raw,
            // <- [🤹‍♂️]
        };
    }
}

/**
 * TODO: Pass isVerbose to constructor and use it in gptChat and gptComplete
 * TODO: Maybe Create some common util for gptChat and gptComplete
 * TODO: Maybe make custom OpenaiError
 */
