import { describe, expect, it } from '@jest/globals';
import spaceTrim from 'spacetrim';
import { parseProjectMarkdown } from './parseProjectMarkdown';

describe('parseProjectMarkdown', () => {
    it('will parse simple project', () => {
        expect(
            parseProjectMarkdown(
                spaceTrim(`
                    # Title

                    Description
        
                `),
            ),
        ).toEqual({ title: 'Title', description: '<p>Description</p>', images: [] });
    });

    it('will parse project with formatted description', () => {
        expect(
            parseProjectMarkdown(
                spaceTrim(`
                    # Title

                    Description **bold**
        
                `),
            ),
        ).toEqual({ title: 'Title', description: '<p>Description <strong>bold</strong></p>', images: [] });
    });

    it('will ignore comments', () => {
        expect(
            parseProjectMarkdown(
                spaceTrim(`
                    <!-- Comment -->

                    # Title

                    <!-- Comment -->

                    Description

                    <!-- Comment -->
        
                `),
            ),
        ).toEqual({ title: 'Title', description: '<p>Description</p>', images: [] });
    });

    it('will parse image', () => {
        expect(
            parseProjectMarkdown(
                spaceTrim(`
                    # Title

                    Description

                    ![Image](./image.svg)
        
                `),
            ),
        ).toEqual({
            title: 'Title',
            description: '<p>Description</p>',
            images: [{ alt: 'Image', src: './image.svg', href: null }],
        });
    });

    it('will parse images and images with links', () => {
        expect(
            parseProjectMarkdown(
                spaceTrim(`
                    # Title

                    Description

                    [![Image1](./image1.svg)](https://project1.org/)
                    [![Image2](./image2.svg)](https://project2.org/)
                    [![Image3](./image3.svg)](https://project3.org/)
        
                `),
            ),
        ).toEqual({
            title: 'Title',
            description: '<p>Description</p>',
            images: [
                { alt: 'Image1', src: './image1.svg', href: 'https://project1.org/' },
                { alt: 'Image2', src: './image2.svg', href: 'https://project2.org/' },
                { alt: 'Image3', src: './image3.svg', href: 'https://project3.org/' },
            ],
        });
    });

    it('will fail on no project', () => {
        expect(() =>
            parseProjectMarkdown(
                spaceTrim(`

                `),
            ),
        ).toThrowError();
        expect(() =>
            parseProjectMarkdown(
                spaceTrim(`
                    Description
                `),
            ),
        ).toThrowError();
    });

    it('will fail on multiple projects', () => {
        expect(() =>
            parseProjectMarkdown(
                spaceTrim(`
                    # Title

                    Description

                    # Title

                    Description
        
                `),
            ),
        ).toThrowError();
    });

    it('will fail when description before title', () => {
        expect(() =>
            parseProjectMarkdown(
                spaceTrim(`
                    Description

                    # Title
                `),
            ),
        ).toThrowError();
    });
});
