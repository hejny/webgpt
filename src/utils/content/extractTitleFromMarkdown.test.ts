import { describe, expect, it } from '@jest/globals';
import { extractTitleFromMarkdown } from './extractTitleFromMarkdown';

describe('extractTitleFromMarkdown', () => {
    it('should return the title from a markdown string', () => {
        const contentText = '# This is a title\n\nSome content';
        expect(extractTitleFromMarkdown(contentText)).toBe('This is a title');
    });

    it('should return null if there is no title in the markdown string', () => {
        const contentText = 'Some content';
        expect(extractTitleFromMarkdown(contentText)).toBeNull();
    });

    it('should ignore markdown comments', () => {
        const contentText = '<!-- This is a comment -->\n# This is a title\n\nSome content';
        expect(extractTitleFromMarkdown(contentText)).toBe('This is a title');
    });
});
