import spaceTrim from 'spacetrim';
import { Prompt } from '../../../types/Prompt';
import { PromptChatResult } from '../../PromptResult';
import { PtpExecutionTools } from '../../PtpExecutionTools';

/**
 * Mocked execution Tools for just echoing the requests for testing purposes.
 */
export class MockedEchoExecutionTools implements PtpExecutionTools {
    public constructor() {}

    /**
     * Calls OpenAI API to use a chat model.
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
}

/**
 * TODO: Allow in spaceTrim: nesting with > ${block(prompt.request)}
 */
