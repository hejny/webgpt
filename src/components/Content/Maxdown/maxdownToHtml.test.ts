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
                    <div style="font-family:Roboto, sans-serif;">
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
                    <div style="font-family:Roboto, sans-serif;">
                        <h1 id="title">Title</h1>
                        <p>Some text</p>
                    </div>
                    <div style="font-family:Roboto Condensed, sans-serif;">
                        <p>Different text</p>
                    </div>
                `),
            ),
        );
    });

    // Note: No need to test more complex cases because they are tested in maxdownNormalization.test.ts
});
