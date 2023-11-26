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
                `),
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
                `) + '\n\n',
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
                `) + '\n\n',
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
                `) + '\n\n',
            ),
        );
    });

    // Note: No need to test more complex cases because they are tested in maxdownNormalization.test.ts
});
