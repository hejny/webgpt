import { describe, expect, it } from '@jest/globals';
import spaceTrim from 'spacetrim';
import { prettifyHtml } from './prettifyHtml';

describe(`prettifyHtml`, () => {
    //Note: Here should be more and simplier tests + We should test other prettifyXyz functions

    it(`should prettify custom html elements`, () => {
        expect(
            prettifyHtml(
                `<h1 id="title">Title</h1><p>Some text</p><p><pricing-table><pricing-plan label="Personal" price="$10"><pricing-feature>Feature 1</pricing-feature><pricing-feature>Feature 2</pricing-feature><pricing-feature>Feature 3</pricing-feature><pricing-feature>Feature 4</pricing-feature></pricing-plan><pricing-plan label="Small Team" price="$20"><pricing-feature>Feature 1</pricing-feature><pricing-feature>Feature 2</pricing-feature><pricing-feature>Feature 3</pricing-feature><pricing-feature>Feature 4</pricing-feature></pricing-plan><pricing-plan label="Enterprise" price="$40"><pricing-feature>Feature 1</pricing-feature><pricing-feature>Feature 2</pricing-feature><pricing-feature>Feature 3</pricing-feature><pricing-feature>Feature 4</pricing-feature></pricing-plan></pricing-table></p>`,
            ),
        ).toBe(
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
            `) + '\n',
        );
    });
});
