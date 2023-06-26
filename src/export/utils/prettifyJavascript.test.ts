import { describe, expect, it } from '@jest/globals';
import spaceTrim from 'spacetrim';
import { prettifyJavascript } from './prettifyJavascript';

describe('prettifyJavascript', () => {
    it(`keeps javascript as it is`, () => {
        expect(
            prettifyJavascript(
                spaceTrim(`
                    console.info('Hello world');
                `),
            ),
        ).toEqual(
            spaceTrim(`
                    console.info('Hello world');
                `),
        );
    });

    it(`prettifyes javascript`, () => {
        expect(
            prettifyJavascript(
                spaceTrim(`
                    console.info('Hello world'   );
                `),
            ),
        ).toEqual(
            spaceTrim(`
                    console.info('Hello world');
                `),
        );
    });
});
