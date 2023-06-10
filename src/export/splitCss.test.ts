import { describe, expect, it } from '@jest/globals';
import spaceTrim from 'spacetrim';
import { splitCss } from './splitCss';

describe('splitCss', () => {
    it('should split the CSS string with a single rule', () => {
        const simpleCss = spaceTrim(`
            .class1 {
                color: red;
            }
        `);

        const expectedChunks = [simpleCss];

        const cssChunks = splitCss(simpleCss);
        expect(cssChunks).toEqual(expectedChunks);
    });

    it('should split the CSS string with multiple rules', () => {
        const simpleCss = spaceTrim(`
            .class1 {
                color: red;
            }

            .class2 {
                color: blue;
            }




            #id1 {
                color: green;
                font-size: 1rem;
            }
        `);

        const expectedChunks = [
            spaceTrim(`
                .class1 {
                    color: red;
                }
            `),
            spaceTrim(`
                .class2 {
                    color: blue;
                }
            `),
            spaceTrim(`
                #id1 {
                    color: green;
                    font-size: 1rem;
                }
            `),
        ];

        const cssChunks = splitCss(simpleCss);
        expect(cssChunks).toEqual(expectedChunks);
    });

    it('should split the CSS string with multiple rules and comment', () => {});

    it('should split the CSS string with imports', () => {});

    it('should split the CSS string with a media query', () => {});

    it('should split the CSS string with multiple rules and media queries', () => {});

    it('should split the CSS string with just comments', () => {});

    it('should crash on invalid css', () => {});
});

/**
 * TODO: !!! Finish tests
 */
