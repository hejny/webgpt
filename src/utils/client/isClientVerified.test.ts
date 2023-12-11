import { describe, expect, it } from '@jest/globals';
import spaceTrim from 'spacetrim';
import { isClientVerified } from './isClientVerified';

describe('how isClientVerified works', () => {
    it('should work with foo', () => {
        expect(
            isClientVerified(
                spaceTrim(`
                    Foo
                `),
            ),
        ).resolves.toBe(true);
    });

    it('should NOT work with bar', () => {
        expect(
            isClientVerified(
                spaceTrim(`
                    bar
                `),
            ),
        ).resolves.toBe(false);
    });
});





/**
 * TODO: !!! Implement
 * TODO: !!!last Annotate
 */
