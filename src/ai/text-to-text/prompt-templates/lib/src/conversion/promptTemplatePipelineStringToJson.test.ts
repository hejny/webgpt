import { describe, expect, it } from '@jest/globals';
import { readFileSync } from 'fs';
import { join } from 'path';
import { string_file_path } from '../../../../../../utils/typeAliases';
import { PromptTemplatePipelineJson } from '../types/PromptTemplatePipelineJson';
import { PromptTemplatePipelineString } from '../types/PromptTemplatePipelineString';
import { promptTemplatePipelineStringToJson } from './promptTemplatePipelineStringToJson';

describe('promptTemplatePipelineStringToJson', () => {
    it('should parse simple promptTemplatePipeline', () => {
        expect(promptTemplatePipelineStringToJson(importPtp('../../samples/00-simple.ptp.md'))).toEqual(
            importPtp('../../samples/00-simple.ptp.json'),
        );
    });

    it('should parse promptTemplatePipeline with comment', () => {
        expect(promptTemplatePipelineStringToJson(importPtp('../../samples/05-comment.ptp.md'))).toEqual(
            importPtp('../../samples/05-comment.ptp.json'),
        );
    });
    it('should parse promptTemplatePipeline with one template', () => {
        expect(promptTemplatePipelineStringToJson(importPtp('../../samples/10-single.ptp.md'))).toEqual(
            importPtp('../../samples/10-single.ptp.json'),
        );
    });
    it('should parse promptTemplatePipeline with two templates', () => {
        expect(promptTemplatePipelineStringToJson(importPtp('../../samples/20-two.ptp.md'))).toEqual(
            importPtp('../../samples/20-two.ptp.json'),
        );
    });

    it('should parse with escape characters', () => {
        expect(promptTemplatePipelineStringToJson(importPtp('../../samples/30-escaping.ptp.md'))).toEqual(
            importPtp('../../samples/30-escaping.ptp.json'),
        );
    });

    it('should parse promptTemplatePipeline with advanced structure', () => {
        expect(promptTemplatePipelineStringToJson(importPtp('../../samples/50-advanced.ptp.md'))).toEqual(
            importPtp('../../samples/50-advanced.ptp.json'),
        );
    });

    it('fail on invalid language block', () => {
        expect(() =>
            promptTemplatePipelineStringToJson(importPtp('../../samples/errors/invalid-language.ptp.md')),
        ).toThrowError();
    });
    it('fail on missing block on prompt template', () => {
        expect(() =>
            promptTemplatePipelineStringToJson(importPtp('../../samples/errors/missing-block.ptp.md')),
        ).toThrowError();
    });
    it('fail on missing return declaration', () => {
        expect(() =>
            promptTemplatePipelineStringToJson(importPtp('../../samples/errors/missing-return-1.ptp.md')),
        ).toThrowError();
    });
    it('fail on invalid return declaration', () => {
        expect(() =>
            promptTemplatePipelineStringToJson(importPtp('../../samples/errors/missing-return-2.ptp.md')),
        ).toThrowError();
    });
    it('fail on multiple prompts in one prompt template', () => {
        expect(() =>
            promptTemplatePipelineStringToJson(importPtp('../../samples/errors/multiple-blocks.ptp.md')),
        ).toThrowError();
    });
    it('fail on lack of structure ', () => {
        expect(() =>
            promptTemplatePipelineStringToJson(importPtp('../../samples/errors/no-heading.ptp.md')),
        ).toThrowError();
    });

    /*
    Note: This is a logic error, not syntax error
    it('fail on using parameter before defining', () => {
        expect(() =>
            promptTemplatePipelineStringToJson(importPtp('../../samples/errors/parameter-used-before-defining.ptp.md')),
        ).toThrowError();
    });
    */

    it('fail on parameters collision', () => {
        expect(() =>
            promptTemplatePipelineStringToJson(importPtp('../../samples/errors/parameters-collision.ptp.md')),
        ).toThrowError();
    });
});

/**
 * Import the text file
 *
 * Note: Using here custom import to work in jest tests
 * Note: Using sync version is 💩 in the production code, but it's ok here in tests
 *
 * @private
 */
function importPtp(path: `${string}.ptp.md`): PromptTemplatePipelineString;
function importPtp(path: `${string}.ptp.json`): PromptTemplatePipelineJson;
function importPtp(path: string_file_path): PromptTemplatePipelineString | PromptTemplatePipelineJson {
    const content = readFileSync(join(__dirname, path), 'utf-8');
    if (path.endsWith('.ptp.json')) {
        return JSON.parse(content) as PromptTemplatePipelineJson;
    } else if (path.endsWith('.ptp.md')) {
        return content as PromptTemplatePipelineString;
    } else {
        throw new Error(`This should be used only for .ptp.md or .ptp.json files`);
    }
}
