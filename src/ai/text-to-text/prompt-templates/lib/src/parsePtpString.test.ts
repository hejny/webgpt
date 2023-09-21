import { describe, expect, it } from '@jest/globals';
import simplePtpSource from '../samples/00-simple.ptp.md';
import commentPtpSource from '../samples/05-comment.ptp.md';
import singlePtpSource from '../samples/10-single.ptp.md';
import twoPtpSource from '../samples/20-two.ptp.md';
import advancedPtpSource from '../samples/50-advanced.ptp.md';

import { parsePtpString } from './parsePtpString';

describe('parsePtpString', () => {
    it('should parse empty ptp', () => {
        expect(parsePtpString(``)).toEqual({
            promptTemplates: [],
        });
    });

    it('should parse simple ptp', () => {
        expect(parsePtpString(simplePtpSource)).toEqual({
            promptTemplates: [],
        });
    });

    it('should parse ptp with comment', () => {
        expect(parsePtpString(commentPtpSource)).toEqual({
            promptTemplates: [],
        });
    });

    it('should parse ptp with one template', () => {
        expect(parsePtpString(singlePtpSource)).toEqual({
            promptTemplates: [],
        });
    });

    it('should parse ptp with two templates', () => {
        expect(parsePtpString(twoPtpSource)).toEqual({
            promptTemplates: [],
        });
    });

    it('should parse ptp with advanced structure', () => {
        expect(parsePtpString(advancedPtpSource)).toEqual({
            promptTemplates: [],
        });
    });

    /*
    // TODO: Are there even any syntax errors in .ptp.md files? (see TODO below)
    // TODO: Theese crashes are more runtime/logic like errors, not parsing (syntax) ones - check in in the resulting json source OR make separate tests for them
    it('should crash on invalid ptp', () => {
        expect(() =>
            parsePtpString(
                spaceTrim(`
                    Pure text
                `),
            ),
        ).toThrowError();
        expect(() =>
            parsePtpString(
                spaceTrim(`
                    Just a **markdown** file
                `),
            ),
        ).toThrowError();

        expect(() =>
            parsePtpString(
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
            parsePtpString(
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
            parsePtpString(
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
            parsePtpString(
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
