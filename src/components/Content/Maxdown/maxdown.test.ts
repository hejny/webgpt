import { describe, expect, it } from '@jest/globals';
import { maxdown } from './maxdown';

describe(`maxdown string template literal tag function`, () => {
    it(`should work with simple maxdown`, () => {
        expect(
            maxdown`
                
                # Hello world

            `,
        ).toBe('# Hello world');
    });

    it(`should work with multiline maxdown`, () => {
        expect(
            maxdown`
                
                # Hello world

                I am multiline **maxdown**

            `,
        ).toBe('# Hello world\n\nI am multiline **maxdown**');
    });

    it(`should work with templated maxdown`, () => {
        expect(
            maxdown`
                
                # Hello world

                I am multiline **${'maxdown'}**

            `,
        ).toBe('# Hello world\n\nI am multiline **maxdown**');
    });
});
