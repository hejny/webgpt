import { describe, expect, it } from '@jest/globals';
import { rotateItems } from './rotateItems';

describe('rotateItems', () => {
    it('rotate items by one', () => {
        expect(rotateItems([1, 2, 3])).toEqual([3, 1, 2]);
        expect(rotateItems(['A', 'B', 'C'])).toEqual(['C', 'A', 'B']);
        expect(rotateItems([1, 'A', true, 2, [1, 2, 3], 3])).toEqual([3, 1, 'A', true, 2, [1, 2, 3]]);
    });

    it('rotate items by N', () => {
        expect(rotateItems([1, 2, 3], { count: 1 })).toEqual([3, 1, 2]);
        expect(rotateItems([1, 2, 3], { count: 2 })).toEqual([2, 3, 1]);
        expect(rotateItems([1, 2, 3], { count: 3 })).toEqual([1, 2, 3]);
        expect(rotateItems([1, 2, 3], { count: 4 })).toEqual([3, 1, 2]);
        expect(rotateItems([1, 2, 3], { count: -1 })).toEqual([2, 3, 1]);
        expect(rotateItems([1, 2, 3], { count: -2 })).toEqual([3, 1, 2]);
        expect(rotateItems([1, 2, 3], { count: -3 })).toEqual([1, 2, 3]);
        expect(rotateItems([1, 2, 3], { count: -4 })).toEqual([2, 3, 1]);
    });

    it('will not be confused by edge-case usage', () => {
        expect(rotateItems([1, 2, 3], { count: 0 })).toEqual([1, 2, 3]);
        expect(rotateItems([])).toEqual([]);
        expect(rotateItems([], { count: 9999 })).toEqual([]);
        expect(rotateItems([5], { count: 9999 })).toEqual([5]);
    });
});
