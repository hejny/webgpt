import spaceTrim from 'spacetrim';
import { Prompt } from '../../../types/Prompt';
import { PromptChatResult, PromptCompletionResult } from '../../PromptResult';
import { PtpExecutionTools } from '../../PtpExecutionTools';

/**
 * Mocked execution Tools for just echoing the requests for testing purposes.
 */
export class MockedEchoExecutionTools implements PtpExecutionTools {
    public constructor() {}

    /**
     * Mocks chat model
     */
    public async gptChat(prompt: Prompt): Promise<PromptChatResult> {
        return {
            response: spaceTrim(
                (block) => `
                    You said:
                    ${block(prompt.request)}
                `,
            ),
            model: `mocked-echo`,
            // <- [🤹‍♂️]
        };
    }

    /**
     * Mocks completion model
     */
    public async gptComplete(prompt: Prompt): Promise<PromptCompletionResult> {
        return {
            response: spaceTrim(
                (block) => `
                    ${block(prompt.request)}
                    And so on...
                `,
            ),
            model: `mocked-echo`,
            // <- [🤹‍♂️]
        };
    }
}

/**
 * TODO: Allow in spaceTrim: nesting with > ${block(prompt.request)}
 */
