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

    // Note: No need to test more complex cases because they are tested in maxdownNormalization.test.ts
});
