import { describe, expect, it } from '@jest/globals';
import { extractTitleFromContent } from './extractTitleFromContent';

describe('extractTitleFromContent', () => {
    it('should return the title from a markdown string', () => {
        const contentText = '# This is a title\n\nSome content';
        expect(extractTitleFromContent(contentText)).toBe('This is a title');
    });

    it('should return null if there is no title in the markdown string', () => {
        const contentText = 'Some content';
        expect(extractTitleFromContent(contentText)).toBeNull();
    });

    it('should ignore markdown comments', () => {
        const contentText = '<!-- This is a comment -->\n# This is a title\n\nSome content';
        expect(extractTitleFromContent(contentText)).toBe('This is a title');
    });

    it('should return the first heading from an HTML string', () => {
        const contentText =
            '<html><head><title>This is a title</title></head><body><h1>This is a heading</h1>Some content</body></html>';
        expect(extractTitleFromContent(contentText)).toBe('This is a heading');
    });

    it('should return null if there is no heading in the HTML string', () => {
        const contentText = '<html><head><title>This is a title</title></head><body>Some content</body></html>';
        expect(extractTitleFromContent(contentText)).toBeNull();
    });
});
