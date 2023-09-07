import { describe, expect, it } from '@jest/globals';
import { Vector } from 'xyzt';
import { downscaleWithAspectRatio } from './downscaleWithAspectRatio';

describe(`downscaleWithAspectRatio`, () => {
    it(`should keep size because it is already the preferred size`, () => {
        expect(downscaleWithAspectRatio(new Vector(1, 1), new Vector(1, 1))).toEqual(new Vector(1, 1));
        expect(downscaleWithAspectRatio(new Vector(2, 2), new Vector(2, 2))).toEqual(new Vector(2, 2));
        expect(downscaleWithAspectRatio(new Vector(3, 3), new Vector(3, 3))).toEqual(new Vector(3, 3));
        expect(downscaleWithAspectRatio(new Vector(1, 2), new Vector(1, 2))).toEqual(new Vector(1, 2));
    });

    it(`should downscale size with same aspect ratio`, () => {
        expect(downscaleWithAspectRatio(new Vector(2, 2), new Vector(1, 1))).toEqual(new Vector(1, 1));
        expect(downscaleWithAspectRatio(new Vector(10, 10), new Vector(2, 2))).toEqual(new Vector(2, 2));
        expect(downscaleWithAspectRatio(new Vector(10, 20), new Vector(2, 4))).toEqual(new Vector(2, 4));
    });

    it(`should downscale size with different aspect ratio`, () => {
        expect(downscaleWithAspectRatio(new Vector(2, 2), new Vector(1, 2))).toEqual(new Vector(1, 1));
        expect(downscaleWithAspectRatio(new Vector(10, 10), new Vector(2, 4))).toEqual(new Vector(2, 2));
        expect(downscaleWithAspectRatio(new Vector(10, 20), new Vector(2, 8))).toEqual(new Vector(2, 4));
    });

    it(`should not upscale`, () => {
        expect(downscaleWithAspectRatio(new Vector(1, 1), new Vector(2, 2))).toEqual(new Vector(1, 1));
        expect(downscaleWithAspectRatio(new Vector(2, 2), new Vector(10, 10))).toEqual(new Vector(2, 2));
        expect(downscaleWithAspectRatio(new Vector(2, 2), new Vector(10, 20))).toEqual(new Vector(2, 2));
    });
});
