import { describe, expect, it } from '@jest/globals';
import spaceTrim from 'spacetrim';
import { extractFirstParagraphFromMarkdown } from './extractFirstParagraphFromMarkdown';

describe('extractFirstParagraphFromMarkdown', () => {
    it('should extract first paragraph from simple markdown', () => {
        const str = spaceTrim(`
            # Heading 1

            Lorem ipsum dolor sit amet, consectetur adipiscing elit.

        
        `);
        const expected = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
        expect(extractFirstParagraphFromMarkdown(str)).toEqual(expected);
    });

    it('should extract first paragraph advanced markdown', () => {
        const str = spaceTrim(`
            # Heading 1

            Lorem ipsum dolor sit amet, consectetur adipiscing elit. [Link](https://example.com)

            > Quote 1

            ## Heading 2

            Other text.

            ---

            More text.

        
        `);
        const expected = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. [Link](https://example.com)';
        expect(extractFirstParagraphFromMarkdown(str)).toEqual(expected);
    });

    it('should extract first paragraph just text', () => {
        const str = /**/ 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
        const expected = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
        expect(extractFirstParagraphFromMarkdown(str)).toEqual(expected);
    });
});
