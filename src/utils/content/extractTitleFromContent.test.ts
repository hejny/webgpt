import { describe, expect, it } from '@jest/globals';
import spaceTrim from 'spacetrim';
import { extractTitleFromContent } from './extractTitleFromContent';

describe('extractTitleFromContent', () => {
    it('should return the title from a markdown string', () => {
        expect(
            extractTitleFromContent(
                spaceTrim(`
                    # This is a title
                    
                    Some content
                `),
            ),
        ).toBe('This is a title');
    });

    it('should return null if there is no title in the string', () => {
        expect(extractTitleFromContent('Some content')).toBeNull();
    });

    it('should ignore markdown comments', () => {
        expect(
            extractTitleFromContent(
                spaceTrim(`
                    <!-- This is a comment -->
                    # This is a title
                    
                    Some content
                `),
            ),
        ).toBe('This is a title');
    });

    it('should return the first heading from an HTML string', () => {
        expect(
            extractTitleFromContent(
                spaceTrim(
                    `<html><head><title>This is a title</title></head><body><h1>This is a heading</h1>Some content</body></html>`,
                ),
            ),
        ).toBe('This is a heading');
    });

    it('should return null if there is no heading in the HTML string', () => {
        expect(
            extractTitleFromContent(
                spaceTrim(
                    `<html><head><title>This is a title BUT not a wanted title</title></head><body>Some content</body></html>`,
                ),
            ),
        ).toBeNull();
    });

    it('should treat content as html despite it starts with markdown comment ', () => {
        expect(
            extractTitleFromContent(
                spaceTrim(`
                    <!--
                    # This is title in comment
                    -->

                    <h1>This is a heading</h1>
                    <p>Some content</p>
                `),
            ),
        ).toBe('This is a heading');
    });
});
