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
            -   Input parameter {thing} Any thing to buy
            
            ## Execution

            -   Execute script
            
            \`\`\`javascript
            thing.split('a').join('b')
            \`\`\`
            
            -> {bhing}
         `) as PromptTemplatePipelineString,
    );
    const ptp = PromptTemplatePipeline.fromJson(ptpJson);
    const ptpExecutor = createPtpExecutor({
        ptp,
        tools: {
            natural: new MockedEchoNaturalExecutionTools(),
            script: [new JavascriptEvalExecutionTools()],
            userInterface: new CallbackInterfaceTools(async () => 'Hello'),
        },
    });

    it('should work when every input parameter defined', () => {
        expect(ptpExecutor({ thing: 'apple' }, () => {})).resolves.toEqual({
            thing: 'apple',
            bhing: 'bpple',
        });
        expect(ptpExecutor({ thing: 'a cup of coffee' }, () => {})).resolves.toEqual({
            thing: 'a cup of coffee',
            bhing: 'b cup of coffee',
        });
    });

    it('should fail when some input parameter is missing', () => {
        expect(ptpExecutor({}, () => {})).rejects.toThrowError(/not defined/i);
    });
});
