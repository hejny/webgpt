import { describe, expect, it } from '@jest/globals';
import { Vector } from 'xyzt';
import { FULLHD, UHD2K, UHD4K } from '../constants';
import { isInAspectRatioRange } from './isInAspectRange';

describe(`isInAspectRange`, () => {
    it(`should be in aspect ratio range when all values are same`, () => {
        expect(isInAspectRatioRange([FULLHD, FULLHD], FULLHD)).toBe(true);
        expect(isInAspectRatioRange([UHD2K, UHD2K], UHD2K)).toBe(true);
        expect(isInAspectRatioRange([UHD4K, UHD4K], UHD4K)).toBe(true);
        expect(isInAspectRatioRange([new Vector(1, 1), new Vector(1, 1)], new Vector(1, 1))).toBe(true);
    });

    it(`should be in aspect ratio range when all values are just scaled`, () => {
        expect(isInAspectRatioRange([new Vector(1, 1), new Vector(2, 2)], new Vector(1.5, 1.5))).toBe(true);
        expect(isInAspectRatioRange([new Vector(1, 1), new Vector(2, 2)], new Vector(3, 3))).toBe(true);
        expect(isInAspectRatioRange([new Vector(1, 2), new Vector(2, 4)], new Vector(0.5, 1))).toBe(true);
    });

    it(`should be in aspect range`, () => {
        expect(isInAspectRatioRange([new Vector(2, 3), new Vector(3, 2)], new Vector(1, 1))).toBe(true);
        expect(isInAspectRatioRange([new Vector(2, 5), new Vector(5, 2)], new Vector(1, 1))).toBe(true);
        expect(isInAspectRatioRange([new Vector(2, 5), new Vector(5, 2)], new Vector(3, 2))).toBe(true);
    });

    it(`should be out of aspect range`, () => {
        expect(isInAspectRatioRange([new Vector(2, 3), new Vector(3, 2)], new Vector(1, 3))).toBe(false);
        expect(isInAspectRatioRange([new Vector(2, 3), new Vector(3, 2)], new Vector(3, 1))).toBe(false);
        expect(isInAspectRatioRange([new Vector(2, 5), new Vector(5, 2)], new Vector(5.1, 1))).toBe(false);
        expect(isInAspectRatioRange([new Vector(2, 5), new Vector(5, 2)], new Vector(6, 2))).toBe(false);
    });
});
