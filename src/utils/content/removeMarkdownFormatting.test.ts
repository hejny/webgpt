import { describe, expect, it } from '@jest/globals';
import { removeMarkdownFormatting } from './removeMarkdownFormatting';

describe('removeMarkdownFormatting', () => {
    it('should remove bold formatting from a string', () => {
        const str = 'This is **bold** text.';
        const expected = 'This is bold text.';
        expect(removeMarkdownFormatting(str)).toEqual(expected);
    });

    it('should remove multiple instances of bold formatting from a string', () => {
        const str = 'This is **bold** and **also bold** text.';
        const expected = 'This is bold and also bold text.';
        expect(removeMarkdownFormatting(str)).toEqual(expected);
    });

    it('should remove italic formatting from a string', () => {
        const str = 'This is *italic* text.';
        const expected = 'This is italic text.';
        expect(removeMarkdownFormatting(str)).toEqual(expected);
    });

    it('should remove multiple instances of italic formatting from a string', () => {
        const str = 'This is *italic* and *also italic* text.';
        const expected = 'This is italic and also italic text.';
        expect(removeMarkdownFormatting(str)).toEqual(expected);
    });

    it('should return the original string if it contains no Markdown tags', () => {
        const str = 'This is a plain string.';
        expect(removeMarkdownFormatting(str)).toEqual(str);
    });
});

/**
 * @see https://chat.openai.com/chat/bb7c3a5b-fe9c-4ccc-9057-f47e0fd66489
 */
