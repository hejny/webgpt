import { createAllSubsetsOf } from './createAllSubsetsOf';

describe(`permutations`, () => {
    it(`permutates an empty array`, () => {
        expect(createAllSubsetsOf()).toEqual([[]]);
    });

    it(`permutates single-member array`, () => {
        expect(createAllSubsetsOf(1)).toEqual([[], [1]]);
    });

    it(`permutates two-member array`, () => {
        expect(createAllSubsetsOf(1, 2)).toEqual([[], [1], [2], [1, 2]]);
    });

    /*
    TODO: Get it working

    it(`permutates multi-member array`, () => {
        expect(createAllSubsetsOf(1, 2, 3)).toEqual([[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]);
    });

    */
});
