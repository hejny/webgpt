import { describe, expect, it } from '@jest/globals';
import spaceTrim from 'spacetrim';
import { markdownToMarkdownStructure } from './markdownToMarkdownStructure';

describe('markdownToMarkdownStructure', () => {
    it('parses supersimple case', () => {
        expect(markdownToMarkdownStructure(``)).toEqual({
            title: null,
            text: '',
            sections: [],
        });
    });

    it('parses simple case', () => {
        expect(markdownToMarkdownStructure(`# Title`)).toEqual({
            title: 'Title',
            text: '',
            sections: [],
        });
    });

    it('parses simple case with text', () => {
        expect(
            markdownToMarkdownStructure(
                spaceTrim(`
                    # Title
                    
                    Text below title
                `),
            ),
        ).toEqual({
            title: 'Title',
            text: 'Text below title',
            sections: [],
        });
    });

    it('parses simple case with multiline text', () => {
        expect(
            markdownToMarkdownStructure(
                spaceTrim(`
                    # Title
                    
                    Text below title
                    Text below title
                    Text below title
                    Text below title
                `),
            ),
        ).toEqual({
            title: 'Title',
            text: spaceTrim(`
                Text below title
                Text below title
                Text below title
                Text below title
            `),
            sections: [],
        });
    });

    it('parses simple case with bold/italic text', () => {
        expect(
            markdownToMarkdownStructure(
                spaceTrim(`
                    # Title
                    
                    Text below title **bold** *italic*
                `),
            ),
        ).toEqual({
            title: 'Title',
            text: 'Text below title **bold** *italic*',
            sections: [],
        });
    });

    it('parses simple case with ul/ol text', () => {
        expect(
            markdownToMarkdownStructure(
                spaceTrim(`
                    # Title
                    
                    Text below title
                    - ul 1
                    - ul 2
                    - ul 3
                    1. ol 1
                    2. ol 2
                    3. ol 3
                `),
            ),
        ).toEqual({
            title: 'Title',
            text: spaceTrim(`
                Text below title
                - ul 1
                - ul 2
                - ul 3
                1. ol 1
                2. ol 2
                3. ol 3
            `),
            sections: [],
        });
    });

    it('parses simple case with text and section', () => {
        expect(
            markdownToMarkdownStructure(
                spaceTrim(`
                    # Title
                    
                    Text below title
                    
                    ## Section 1
                    
                    Text below section 1
                `),
            ),
        ).toEqual({
            title: 'Title',
            text: 'Text below title',
            sections: [
                {
                    title: 'Section 1',
                    text: 'Text below section 1',
                    sections: [],
                },
            ],
        });
    });

    it('parses advanced case', () => {
        expect(
            markdownToMarkdownStructure(
                spaceTrim(`
                    # Title
                    
                    Text below title
                    
                    ## Section 1
                    
                    Text below section 1
                    
                    ## Section 2
                    
                    Text below section 2
                    
                    ### Subsection 2.1
                    
                    Text below subsection 2.1
                    
                    ### Subsection 2.2
                    
                    Text below subsection 2.2
                `),
            ),
        ).toEqual({
            title: 'Title',
            text: 'Text below title',
            sections: [
                {
                    title: 'Section 1',
                    text: 'Text below section 1',
                    sections: [],
                },
                {
                    title: 'Section 2',
                    text: 'Text below section 2',
                    sections: [
                        {
                            title: 'Subsection 2.1',
                            text: 'Text below subsection 2.1',
                            sections: [],
                        },
                        {
                            title: 'Subsection 2.2',
                            text: 'Text below subsection 2.2',
                            sections: [],
                        },
                    ],
                },
            ],
        });
    });
});
