import { describe, expect } from '@jest/globals';
import { extractTitleFromHtml } from './extractTitleFromHtml';

describe('extractFirstHeadingFromHtmlRegex', () => {
    test('should return the first heading from an HTML string', () => {
        const contentText =
            '<html><head><title>This is a title</title></head><body><h1>This is a heading</h1>Some content</body></html>';
        expect(extractTitleFromHtml(contentText)).toBe('This is a heading');
    });

    test('should return null if there is no heading in the HTML string', () => {
        const contentText = '<html><head><title>This is a title</title></head><body>Some content</body></html>';
        expect(extractTitleFromHtml(contentText)).toBeNull();
    });
});
