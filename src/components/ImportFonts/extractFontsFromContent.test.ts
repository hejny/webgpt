import { describe, expect, it } from '@jest/globals';
import { extractFontsFromContent } from './extractFontsFromContent';

describe('extractTitleFromContent', () => {
    it('should extract no font from string without a font', () => {
        expect(extractFontsFromContent('')).toEqual(new Set());
        expect(extractFontsFromContent('Hello world')).toEqual(new Set());
    });

    /*
    TODO: [🔠]
    it('should extract font from string with a font', () => {
        expect(extractFontsFromContent('font-family: "Arial";')).toEqual(new Set(['Arial']));
        expect(extractFontsFromContent('font:Arial')).toEqual(new Set(['Arial']));
    });
    */
});
