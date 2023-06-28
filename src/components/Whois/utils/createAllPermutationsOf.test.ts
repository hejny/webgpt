import { describe, expect, it } from '@jest/globals';
import { createAllPermutationsOf } from './createAllPermutationsOf';

describe(`permutations`, () => {
    it(`permutates an empty array`, () => {
        expect(createAllPermutationsOf()).toEqual([[]]);
    });

    it(`permutates single-member array`, () => {
        expect(createAllPermutationsOf(1)).toEqual([[1]]);
    });

    it(`permutates two-member array`, () => {
        expect(createAllPermutationsOf(1, 2)).toEqual([
            [1, 2],
            [2, 1],
        ]);
    });
});
