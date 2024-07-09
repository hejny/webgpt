import { describe, expect, it } from '@jest/globals';
import spaceTrim from 'spacetrim';
import { just } from '../../../utils/just';
import { string_maxdown } from '../../../utils/typeAliases';
import { maxdownToHtml } from './maxdownToHtml';

describe(`conversion from maxdown to html`, () => {
    it(`should convert simple maxdown`, () => {
        expect(
            maxdownToHtml(
                spaceTrim(`
                    Some text
                `) as string_maxdown,
            ),
        ).toBe(
            just(
                spaceTrim(`
                    <p>Some text</p>
                `),
            ),
        );
    });

    it(`should convert maxdown with structure`, () => {
        expect(
            maxdownToHtml(
                spaceTrim(`

                    # Title

                    Some text

                `) as string_maxdown,
            ),
        ).toBe(
            just(
                spaceTrim(`
            
                    <h1 id="title">Title</h1>
                    <p>Some text</p>

                `),
            ),
        );
    });

    it(`should convert maxdown with one font`, () => {
        expect(
            maxdownToHtml(
                spaceTrim(`
                    <!--font:Roboto-->

                    # Title
                    
                    Some text

                `) as string_maxdown,
            ),
        ).toBe(
            just(
                spaceTrim(`
                    <div style="font-family: Roboto, sans-serif">
                        <h1 id="title">Title</h1>
                        <p>Some text</p>
                    </div>
                `),
            ),
        );
    });

    it(`should convert maxdown with multiple fonts`, () => {
        expect(
            maxdownToHtml(
                spaceTrim(`
                    <!--font:Roboto-->

                    # Title
                    
                    Some text

                    <!--font:Roboto Condensed-->

                    Different text

                `) as string_maxdown,
            ),
        ).toBe(
            just(
                spaceTrim(`
                    <div style="font-family: Roboto, sans-serif">
                        <h1 id="title">Title</h1>
                        <p>Some text</p>
                    </div>
                    <div style="font-family: Roboto Condensed, sans-serif">
                        <p>Different text</p>
                    </div>
                `),
            ),
        );
    });

    it(`should preserve pretty formatting`, () => {
        expect(
            maxdownToHtml(
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
                `) as string_maxdown,
            ),
        ).toBe(
            just(
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
        );
    });

    it(`should preserve rich pretty formatting`, () => {
        expect(
            maxdownToHtml(
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
                `) as string_maxdown,
            ),
        ).toBe(
            just(
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
        );
    });

    // Note: No need to test more complex cases because they are tested in maxdownNormalization.test.ts
});
