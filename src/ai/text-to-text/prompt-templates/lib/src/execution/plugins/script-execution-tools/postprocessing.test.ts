import { describe, expect, it } from '@jest/globals';
import spaceTrim from 'spacetrim';
import { PromptTemplatePipeline } from '../../../classes/PromptTemplatePipeline';
import { promptTemplatePipelineStringToJson } from '../../../conversion/promptTemplatePipelineStringToJson';
import { PromptTemplatePipelineString } from '../../../types/PromptTemplatePipelineString';
import { createPtpExecutor } from '../../createPtpExecutor';
import { MockedEchoNaturalExecutionTools } from '../natural-execution-tools/mocked/MockedEchoNaturalExecutionTools';
import { CallbackInterfaceTools } from '../user-interface-execution-tools/callback/CallbackInterfaceTools';
import { JavascriptEvalExecutionTools } from './javascript/JavascriptEvalExecutionTools';

describe('createPtpExecutor + executing scripts in ptp', () => {
    const ptpJson = promptTemplatePipelineStringToJson(
        spaceTrim(`
            # Sample prompt

            Show how to use a simple prompt with no parameters.
            
            -   PTP version 1.0.0
            -   Input parameter {yourName} Name of the hero
            
            ## Question

            -   Postprocess reverse
            -   Postprocess removeDiacritics
            -   Postprocess normalizeTo_SCREAMING_CASE
            
            \`\`\`markdown
            Hello {yourName}!
            \`\`\`
            
            -> {greeting}
         `) as PromptTemplatePipelineString,
    );

    const ptp = PromptTemplatePipeline.fromJson(ptpJson);
    const ptpExecutor = createPtpExecutor({
        ptp,
        tools: {
            natural: new MockedEchoNaturalExecutionTools({ isVerbose: true }),
            script: [new JavascriptEvalExecutionTools({ isVerbose: true })],
            userInterface: new CallbackInterfaceTools({
                isVerbose: true,
                async callback() {
                    return 'Hello';
                },
            }),
        },
    });

    it('should work when every input parameter defined', () => {
        expect(ptpExecutor({ yourName: 'Paůl' }, () => {})).resolves.toEqual({
            yourName: 'yourName',
            greeting: 'Hello LAUP!',
        });
    });
});

/**
 * TODO: What is the ideal folder for this test?
 */
