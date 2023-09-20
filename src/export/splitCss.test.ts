import { describe, expect, it } from '@jest/globals';
import { spaceTrim } from 'spacetrim';
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

    it('should split the CSS string with imports', () => {
        const simpleCss = spaceTrim(`
            @import url(https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap);

            .class1 {
                color: red;
            }
        `);

        const expectedChunks = [
            spaceTrim(`
                @import url(https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap);
            `),
            spaceTrim(`
                .class1 {
                    color: red;
                }
            `),
        ];

        const cssChunks = splitCss(simpleCss);
        expect(cssChunks).toEqual(expectedChunks);
    });

    it('should split the CSS string with a media query', () => {
        // TODO: Write test
    });

    it('should split the CSS string with @keyframes of an animation', () => {
        // TODO: [0] Use this DRY pattern to all the tests
        const cssChunks = [
            `
                .class1 {
                    border: 1px solid #ddd;
                }
            `,
            `
                @keyframes animation-1 {
                    0% {
                        background-position: -650px 0;
                    }
                    100% {
                        background-position: 650px 0;
                    }
                }
            `,
            `
                @keyframes animation-2 {
                    0% {
                        background-position: -650px 0;
                    }
                    100% {
                        background-position: 650px 0;
                    }
                }
            `,
        ].map((cssChunk) => spaceTrim(cssChunk));

        expect(splitCss(cssChunks.join('\n\n\n'))).toEqual(cssChunks);
    });

    it('should split the CSS string with multiple rules and media queries', () => {
        // TODO: Write test
    });

    it('should split the CSS string with just comments', () => {
        // TODO: Write test
    });

    it('should crash on invalid css', () => {
        // TODO: Write test
    });
});

/**
 * TODO: [0] Use this DRY pattern to all the tests
 * TODO: Finish tests
 */
