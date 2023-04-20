import { Vector } from 'xyzt';
import { ISvgPath } from './ISvgPath';

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