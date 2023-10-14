import { createAllSubsetsOf } from './createAllSubsetsOf';
import { describe, expect, it } from '@jest/globals';

describe(`subsets`, () => {
    it(`subsets an empty array`, () => {
        expect(createAllSubsetsOf()).toEqual([[]]);
    });

    it(`subsets single-member array`, () => {
        expect(createAllSubsetsOf(1)).toEqual([[], [1]]);
    });

    it(`subsets two-member array`, () => {
        expect(createAllSubsetsOf(1, 2)).toEqual([[], [1], [2], [1, 2]]);
    });

    /*
    TODO: Get it working

    it(`permutates multi-member array`, () => {
        expect(createAllSubsetsOf(1, 2, 3)).toEqual([[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]);
    });

    */
});
