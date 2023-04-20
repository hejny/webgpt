import { describe, expect, it } from '@jest/globals';
import { Vector } from 'xyzt';
import { parseSvgPath } from './parseSvgPath';

describe('parsing of SVG path', () => {
    it(`parse simple path with explicit command before each coordinates`, () => {
        expect(
            parseSvgPath(`
                M 1,1
                L 1,1
                L 1,1
            
            `),
        ).toEqual([
            {
                command: 'M',
                positions: [new Vector(1, 1)],
            },
            {
                command: 'L',
                positions: [new Vector(1, 1)],
            },
            {
                command: 'L',
                positions: [new Vector(1, 1)],
            },
        ]);
    });
});

/**
 * TODO: Implement more and more sofisticated cases
 */
