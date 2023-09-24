import { describe, expect, it } from '@jest/globals';
import { readFileSync } from 'fs';
import { join } from 'path';
import spaceTrim from 'spacetrim';
import { string_file_path } from '../../../../../../utils/typeAliases';
import { PromptTemplatePipelineString } from '../types/PromptTemplatePipelineString';
import { promptTemplatePipelineStringToJson } from './promptTemplatePipelineStringToJson';

describe('promptTemplatePipelineStringToJson', () => {
    /*
    TODO:
    it('should parse empty promptTemplatePipeline', () => {
        expect(promptTemplatePipelineStringToJson(``)).toEqual({
            promptTemplates: [],
        });
    });
    */

    it('should parse simple promptTemplatePipeline', () => {
        expect(promptTemplatePipelineStringToJson(importPtp('../../samples/00-simple.ptp.md'))).toEqual({
            promptTemplates: [
                {
                    modelRequirements: {
                        variant: 'CHAT',
                    },
                    promptTemplate: 'Hello',
                    resultingParamName: 'greeting',
                },
            ],
        });
    });

    it('should parse promptTemplatePipeline with comment', () => {
        expect(promptTemplatePipelineStringToJson(importPtp('../../samples/05-comment.ptp.md'))).toEqual({
            promptTemplates: [
                {
                    modelRequirements: {
                        variant: 'CHAT',
                    },
                    promptTemplate: 'Hello',
                    resultingParamName: 'greeting',
                },
            ],
        });
    });

    it('should parse promptTemplatePipeline with one template', () => {
        expect(promptTemplatePipelineStringToJson(importPtp('../../samples/10-single.ptp.md'))).toEqual({
            promptTemplates: [
                {
                    modelRequirements: {
                        variant: 'CHAT',
                    },
                    promptTemplate: `Write synonym for "{word}"`,
                    resultingParamName: 'wordSynonym',
                },
            ],
        });
    });

    it('should parse promptTemplatePipeline with two templates', () => {
        expect(promptTemplatePipelineStringToJson(importPtp('../../samples/20-two.ptp.md'))).toEqual({
            promptTemplates: [
                {
                    modelRequirements: {
                        variant: 'CHAT',
                    },
                    promptTemplate: `Write synonym for "{word}"`,
                    resultingParamName: 'wordSynonym',
                },
                {
                    modelRequirements: {
                        variant: 'CHAT',
                    },
                    promptTemplate: 'Write sentence with "{word}" and "{wordSynonym}" in it',
                    resultingParamName: 'sentenceWithTwoSynonyms',
                },
            ],
        });
    });

    it('should parse promptTemplatePipeline with advanced structure', () => {
        expect(promptTemplatePipelineStringToJson(importPtp('../../samples/50-advanced.ptp.md'))).toEqual({
            promptTemplates: [
                {
                    modelRequirements: {
                        variant: 'CHAT',
                    },
                    promptTemplate: `Write synonym for "{word}"`,
                    resultingParamName: 'wordSynonym',
                },
                {
                    modelRequirements: {
                        variant: 'CHAT',
                    },
                    promptTemplate: `Write sentence with "{word}" and "{wordSynonym}" in it`,
                    resultingParamName: 'sentenceWithTwoSynonyms',
                },
                {
                    modelRequirements: {
                        variant: 'CHAT',
                    },
                    promptTemplate: spaceTrim(`
                    
                        Remove word "{word}" from sentence and modify it so that it makes sense:

                        ## Rules:

                        -   Sentence must be grammatically correct
                        -   Sentence must make sense after removing the word

                        ## The Sentence:

                        > {sentenceWithTwoSynonyms}

                    `),
                    resultingParamName: 'sentenceWithOriginalWordRemoved',
                },
                {
                    modelRequirements: {
                        variant: 'CHAT',
                    },
                    promptTemplate: spaceTrim(`
                    
                        Compare meaning of thee two sentences:

                        ## Sentence 1:
                        
                        > {sentenceWithTwoSynonyms}
                        
                        ## Sentence 2:
                        
                        > {sentenceWithOriginalWordRemoved}

                    `),
                    resultingParamName: 'comparisonOfTwoSentences',
                },
            ],
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

/**
 * Note: Using here !!!
 * Note: Using sync version is 💩 in the production code, but it's ok here in tests
 */
function importPtp(path: string_file_path): PromptTemplatePipelineString {
    return readFileSync(join(__dirname, path), 'utf-8') as PromptTemplatePipelineString;
}
