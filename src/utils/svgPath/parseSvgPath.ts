import { Vector } from 'xyzt';
import { ISvgPath } from './ISvgPath';

/**
 * Parses a string that defines an SVG path and returns an array of ISvgPath objects ⁘
 * 
 * @param {string} pathDefinition - The string that defines the SVG path.
 * @returns {ISvgPath[]} An array of ISvgPath objects that represent the SVG path commands and positions.
 */
export function parseSvgPath(pathDefinition: string): ISvgPath {
  
    return [
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
    ];
}

/**
 * TODO: Implement
 */