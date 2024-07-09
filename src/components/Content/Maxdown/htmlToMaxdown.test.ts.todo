import { describe, expect, it } from '@jest/globals';
import spaceTrim from 'spacetrim';
import { just } from '../../../utils/just';
import { htmlToMaxdown } from './htmlToMaxdown';

describe(`conversion from html to maxdown`, () => {
    it(`should convert simple html`, () => {
        expect(
            htmlToMaxdown(
                spaceTrim(`
                    <p>Some text</p>
             
                `),
            ),
        ).toBe(
            just(
                spaceTrim(`
                    Some text
                `) + '\n',
            ),
        );
    });

    it(`should convert maxdown with one font`, () => {
        expect(
            htmlToMaxdown(
                spaceTrim(`
                    <div style="font-family:Roboto, sans-serif;">
                        <h1 id="title">Title</h1>
                        <p>Some text</p>
                    </div>
             
                `),
            ),
        ).toBe(
            just(
                spaceTrim(`
                    <!--font:Roboto-->

                    # Title
                    
                    Some text
                `) + '\n',
            ),
        );
    });

    it(`should convert maxdown with multiple fonts`, () => {
        expect(
            htmlToMaxdown(
                spaceTrim(`
                    <div style="font-family:Roboto, sans-serif;">
                        <h1 id="title">Title</h1>
                        <p>Some text</p>
                    </div>
                    <div style="font-family:Barlow Condensed, sans-serif;">
                        <h1 id="title">Title</h1>
                        <p>Some text</p>
                    </div>
             
                `),
            ),
        ).toBe(
            just(
                spaceTrim(`
                    <!--font:Roboto-->

                    # Title
                    
                    Some text

                    <!--font:Barlow Condensed-->

                    # Title
                    
                    Some text
                `) + '\n',
            ),
        );
    });

    it(`should convert maxdown onelined with font`, () => {
        expect(
            htmlToMaxdown(
                `<div style="font-family:Roboto, sans-serif;"><h1 id="title">Title</h1><p>Some text</p></div>`,
            ),
        ).toBe(
            just(
                spaceTrim(`
                    <!--font:Roboto-->

                    # Title
                    
                    Some text
                `) + '\n',
            ),
        );
    });

    it(`should preserve pretty formatting`, () => {
        expect(
            htmlToMaxdown(
                spaceTrim(`
                    <p>
                        <pricing-table>
                            <pricing-plan label="Personal" price="$10">
                                <pricing-feature>Feature 1</pricing-feature>
                                <pricing-feature>Feature 2</pricing-feature>
                                <pricing-feature>Feature 3</pricing-feature>
                                <pricing-feature>Feature 4</pricing-feature>
                            </pricing-plan>
                            <pricing-plan label="Small Team" price="$20">
                                <pricing-feature>Feature 1</pricing-feature>
                                <pricing-feature>Feature 2</pricing-feature>
                                <pricing-feature>Feature 3</pricing-feature>
                                <pricing-feature>Feature 4</pricing-feature>
                            </pricing-plan>
                            <pricing-plan label="Enterprise" price="$40">
                                <pricing-feature>Feature 1</pricing-feature>
                                <pricing-feature>Feature 2</pricing-feature>
                                <pricing-feature>Feature 3</pricing-feature>
                                <pricing-feature>Feature 4</pricing-feature>
                            </pricing-plan>
                        </pricing-table>
                    </p>
                `),
            ),
        ).toBe(
            just(
                spaceTrim(`
                    <pricing-table>
                        <pricing-plan label="Personal" price="$10">
                            <pricing-feature>Feature 1</pricing-feature>
                            <pricing-feature>Feature 2</pricing-feature>
                            <pricing-feature>Feature 3</pricing-feature>
                            <pricing-feature>Feature 4</pricing-feature>
                        </pricing-plan>
                        <pricing-plan label="Small Team" price="$20">
                            <pricing-feature>Feature 1</pricing-feature>
                            <pricing-feature>Feature 2</pricing-feature>
                            <pricing-feature>Feature 3</pricing-feature>
                            <pricing-feature>Feature 4</pricing-feature>
                        </pricing-plan>
                        <pricing-plan label="Enterprise" price="$40">
                            <pricing-feature>Feature 1</pricing-feature>
                            <pricing-feature>Feature 2</pricing-feature>
                            <pricing-feature>Feature 3</pricing-feature>
                            <pricing-feature>Feature 4</pricing-feature>
                        </pricing-plan>
                    </pricing-table>
                `) + '\n',
            ),
        );
    });

    it(`should preserve rich pretty formatting`, () => {
        expect(
            htmlToMaxdown(
                spaceTrim(`
                    <h1 id="title">Title</h1>
                    <p>Some text</p>
                    <p>
                        <pricing-table>
                            <pricing-plan label="Personal" price="$10">
                                <pricing-feature>Feature 1</pricing-feature>
                                <pricing-feature>Feature 2</pricing-feature>
                                <pricing-feature>Feature 3</pricing-feature>
                                <pricing-feature>Feature 4</pricing-feature>
                            </pricing-plan>
                            <pricing-plan label="Small Team" price="$20">
                                <pricing-feature>Feature 1</pricing-feature>
                                <pricing-feature>Feature 2</pricing-feature>
                                <pricing-feature>Feature 3</pricing-feature>
                                <pricing-feature>Feature 4</pricing-feature>
                            </pricing-plan>
                            <pricing-plan label="Enterprise" price="$40">
                                <pricing-feature>Feature 1</pricing-feature>
                                <pricing-feature>Feature 2</pricing-feature>
                                <pricing-feature>Feature 3</pricing-feature>
                                <pricing-feature>Feature 4</pricing-feature>
                            </pricing-plan>
                        </pricing-table>
                    </p>
                `),
            ),
        ).toBe(
            just(
                spaceTrim(`
                    # Title

                    Some text

                    <pricing-table>
                        <pricing-plan label="Personal" price="$10">
                            <pricing-feature>Feature 1</pricing-feature>
                            <pricing-feature>Feature 2</pricing-feature>
                            <pricing-feature>Feature 3</pricing-feature>
                            <pricing-feature>Feature 4</pricing-feature>
                        </pricing-plan>
                        <pricing-plan label="Small Team" price="$20">
                            <pricing-feature>Feature 1</pricing-feature>
                            <pricing-feature>Feature 2</pricing-feature>
                            <pricing-feature>Feature 3</pricing-feature>
                            <pricing-feature>Feature 4</pricing-feature>
                        </pricing-plan>
                        <pricing-plan label="Enterprise" price="$40">
                            <pricing-feature>Feature 1</pricing-feature>
                            <pricing-feature>Feature 2</pricing-feature>
                            <pricing-feature>Feature 3</pricing-feature>
                            <pricing-feature>Feature 4</pricing-feature>
                        </pricing-plan>
                    </pricing-table>
                `) + '\n',
            ),
        );
    });

    // Note: No need to test more complex cases because they are tested in maxdownNormalization.test.ts
});
