import { describe, expect, it } from '@jest/globals';
import { spaceTrim } from 'spacetrim';
import { extractDescriptionFromContent } from './extractDescriptionFromContent';

describe('extractDescriptionFromContent', () => {
    it('should return the description from a markdown string', () => {
        expect(
            extractDescriptionFromContent(
                spaceTrim(`
                    # This is a title
                    
                    This is a description
                `),
            ),
        ).toBe('This is a description');
    });

    it('should return null if there is no description in the string', () => {
        expect(extractDescriptionFromContent('#Just title')).toBeNull();
    });

    it('should ignore markdown comments', () => {
        expect(
            extractDescriptionFromContent(
                spaceTrim(`
                    <!-- This is a comment -->
                    # This is a title
                    
                    Some content
                `),
            ),
        ).toBe('Some content');
    });

    it('should return the first heading from an HTML string', () => {
        expect(
            extractDescriptionFromContent(
                spaceTrim(
                    `<html><head><description>This is a title</description></head><body><h1>This is a heading</h1><p>Some content</p></body></html>`,
                ),
            ),
        ).toBe('Some content');
    });

    it('should return null if there is no heading in the HTML string', () => {
        expect(extractDescriptionFromContent(`<h1>Some title</h1>`)).toBeNull();
        expect(extractDescriptionFromContent(`<h2>Some title</h2>`)).toBeNull();
        expect(extractDescriptionFromContent(`<h3>Some title</h3>`)).toBeNull();
        expect(extractDescriptionFromContent(`<h1>Some <b>title</b></h1>`)).toBeNull();
        expect(extractDescriptionFromContent(`<title>Some title</title>`)).toBeNull();
    });

    it('should treat content as html despite it starts with markdown comment ', () => {
        expect(
            extractDescriptionFromContent(
                spaceTrim(`
                    <!--
                    # This is description in comment
                    -->

                    <h1>This is a heading</h1>
                    <p>Some content</p>
                `),
            ),
        ).toBe('Some content');
    });
});
