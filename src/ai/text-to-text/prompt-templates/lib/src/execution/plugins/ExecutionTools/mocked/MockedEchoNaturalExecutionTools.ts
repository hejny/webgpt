import spaceTrim from 'spacetrim';
import { Prompt } from '../../../../types/Prompt';
import { NaturalExecutionTools } from '../../../NaturalExecutionTools';
import { PromptChatResult, PromptCompletionResult } from '../../../PromptResult';


/**
 * Mocked execution Tools for just echoing the requests for testing purposes.
 */
export class MockedEchoNaturalExecutionTools implements NaturalExecutionTools {
    public constructor() {}

    /**
     * Mocks chat model
     */
    public async gptChat(prompt: Prompt): Promise<PromptChatResult> {
        return {
            content: spaceTrim(
                (block) => `
                    You said:
                    ${block(prompt.content)}
                `,
            ),
            model: `mocked-echo`,
            raw: {
                note: `This is mocked echo`,
            },
            // <- [🤹‍♂️]
        };
    }

    /**
     * Mocks completion model
     */
    public async gptComplete(prompt: Prompt): Promise<PromptCompletionResult> {
        return {
            content: spaceTrim(
                (block) => `
                    ${block(prompt.content)}
                    And so on...
                `,
            ),
            model: `mocked-echo`,
            raw: {
                note: `This is mocked echo`,
            },
            // <- [🤹‍♂️]
        };
    }
}

/**
 * TODO: Allow in spaceTrim: nesting with > ${block(prompt.request)}
 */
