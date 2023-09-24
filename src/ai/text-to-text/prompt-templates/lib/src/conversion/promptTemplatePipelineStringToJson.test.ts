import { describe, expect, it } from '@jest/globals';
import { readFileSync } from 'fs';
import { join } from 'path';
import { promptTemplatePipelineStringToJson } from './promptTemplatePipelineStringToJson';

/**
 * Note: Using here !!!
 */
function importInUnitTest(path: string): any {
    return readFileSync(join(__dirname, path), 'utf-8');
}

const simplePromptTemplatePipelineString = importInUnitTest('../../samples/00-simple.ptp.md');
const commentPromptTemplatePipelineString = importInUnitTest('../../samples/05-comment.ptp.md');
const singlePromptTemplatePipelineString = importInUnitTest('../../samples/10-single.ptp.md');
const twoPromptTemplatePipelineString = importInUnitTest('../../samples/20-two.ptp.md');
const advancedPromptTemplatePipelineString = importInUnitTest('../../samples/50-advanced.ptp.md');

describe('promptTemplatePipelineStringToJson', () => {
    it('should parse empty promptTemplatePipeline', () => {
        expect(promptTemplatePipelineStringToJson(``)).toEqual({
            promptTemplates: [],
        });
    });

    it('should parse simple promptTemplatePipeline', () => {
        expect(promptTemplatePipelineStringToJson(simplePromptTemplatePipelineString)).toEqual({
            promptTemplates: [],
        });
    });

    it('should parse promptTemplatePipeline with comment', () => {
        expect(promptTemplatePipelineStringToJson(commentPromptTemplatePipelineString)).toEqual({
            promptTemplates: [],
        });
    });

    it('should parse promptTemplatePipeline with one template', () => {
        expect(promptTemplatePipelineStringToJson(singlePromptTemplatePipelineString)).toEqual({
            promptTemplates: [],
        });
    });

    it('should parse promptTemplatePipeline with two templates', () => {
        expect(promptTemplatePipelineStringToJson(twoPromptTemplatePipelineString)).toEqual({
            promptTemplates: [],
        });
    });

    it('should parse promptTemplatePipeline with advanced structure', () => {
        expect(promptTemplatePipelineStringToJson(advancedPromptTemplatePipelineString)).toEqual({
            promptTemplates: [],
        });
    });

    /*
    // TODO: Are there even any syntax errors in .promptTemplatePipeline.md files? (see TODO below)
    // TODO: Theese crashes are more runtime/logic like errors, not parsing (syntax) ones - check in in the resulting json String OR make separate tests for them
    it('should crash on invalid promptTemplatePipeline', () => {
        expect(() =>
            promptTemplatePipelineStringToJson(
                spaceTrim(`
                    Pure text
                `),
            ),
        ).toThrowError();
        expect(() =>
            promptTemplatePipelineStringToJson(
                spaceTrim(`
                    Just a **markdown** file
                `),
            ),
        ).toThrowError();

        expect(() =>
            promptTemplatePipelineStringToJson(
                spaceTrim(`
                    No

                    ---

                    Variables
                `),
            ),
        ).toThrowError();
    });
    it('should crash when using undefined variable name', () => {
        expect(() =>
            promptTemplatePipelineStringToJson(
                spaceTrim(`
                    Write random word

                    -> {foo}

                    ---

                    Defined foo but using {bar}
                `),
            ),
        ).toThrowError();
    });
    it('should crash on variable name collision', () => {
        expect(() =>
            promptTemplatePipelineStringToJson(
                spaceTrim(`
                    Write synonym of {word}

                    -> {word}

                    <!-- Collision of {word} variable -->
                `),
            ),
        ).toThrowError();
    });

    it('should crash when using variable before the definition', () => {
        expect(() =>
            promptTemplatePipelineStringToJson(
                spaceTrim(`
                    Write sentence with {wordSynonym}

                    -> {sentence}
                    
                    ---

                    Write synonym of {word}

                    -> {wordSynonym}

                    
                `),
            ),
        ).toThrowError();
    });
    */
});
