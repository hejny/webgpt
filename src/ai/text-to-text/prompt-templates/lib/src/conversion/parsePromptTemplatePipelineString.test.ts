import { describe, expect, it } from '@jest/globals';
import simplePromptTemplatePipelineString from '../samples/00-simple.ptp.md';
import commentPromptTemplatePipelineString from '../samples/05-comment.ptp.md';
import singlePromptTemplatePipelineString from '../samples/10-single.ptp.md';
import twoPromptTemplatePipelineString from '../samples/20-two.ptp.md';
import advancedPromptTemplatePipelineString from '../samples/50-advanced.ptp.md';
import { parsePromptTemplatePipelineString } from './parsePromptTemplatePipelineString';

describe('parsePromptTemplatePipelineString', () => {
    it('should parse empty promptTemplatePipeline', () => {
        expect(parsePromptTemplatePipelineString(``)).toEqual({
            promptTemplates: [],
        });
    });

    it('should parse simple promptTemplatePipeline', () => {
        expect(parsePromptTemplatePipelineString(simplePromptTemplatePipelineString)).toEqual({
            promptTemplates: [],
        });
    });

    it('should parse promptTemplatePipeline with comment', () => {
        expect(parsePromptTemplatePipelineString(commentPromptTemplatePipelineString)).toEqual({
            promptTemplates: [],
        });
    });

    it('should parse promptTemplatePipeline with one template', () => {
        expect(parsePromptTemplatePipelineString(singlePromptTemplatePipelineString)).toEqual({
            promptTemplates: [],
        });
    });

    it('should parse promptTemplatePipeline with two templates', () => {
        expect(parsePromptTemplatePipelineString(twoPromptTemplatePipelineString)).toEqual({
            promptTemplates: [],
        });
    });

    it('should parse promptTemplatePipeline with advanced structure', () => {
        expect(parsePromptTemplatePipelineString(advancedPromptTemplatePipelineString)).toEqual({
            promptTemplates: [],
        });
    });

    /*
    // TODO: Are there even any syntax errors in .promptTemplatePipeline.md files? (see TODO below)
    // TODO: Theese crashes are more runtime/logic like errors, not parsing (syntax) ones - check in in the resulting json String OR make separate tests for them
    it('should crash on invalid promptTemplatePipeline', () => {
        expect(() =>
            parsePromptTemplatePipelineString(
                spaceTrim(`
                    Pure text
                `),
            ),
        ).toThrowError();
        expect(() =>
            parsePromptTemplatePipelineString(
                spaceTrim(`
                    Just a **markdown** file
                `),
            ),
        ).toThrowError();

        expect(() =>
            parsePromptTemplatePipelineString(
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
            parsePromptTemplatePipelineString(
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
            parsePromptTemplatePipelineString(
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
            parsePromptTemplatePipelineString(
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
