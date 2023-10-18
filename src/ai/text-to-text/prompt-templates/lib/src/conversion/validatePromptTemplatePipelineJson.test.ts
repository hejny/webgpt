import { describe, expect, it } from '@jest/globals';
import { promptTemplatePipelineStringToJson } from './promptTemplatePipelineStringToJson';
import { validatePromptTemplatePipelineJson } from './validatePromptTemplatePipelineJson';
import { importPtp } from './_importPtp';

describe('promptTemplatePipelineStringToJson', () => {
    it('fail on using parameter before defining', () => {
        expect(() => {
            const ptpString = importPtp('../../samples/errors/logic/parameter-used-before-defining.ptp.md');
            const ptpJson = promptTemplatePipelineStringToJson(ptpString);
            validatePromptTemplatePipelineJson(ptpJson);
        }).toThrowError();
    });
});
