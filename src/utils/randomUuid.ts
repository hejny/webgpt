import { v4 } from 'uuid';
import type { uuid } from './typeAliases';

/**
 * Generates random UUID v4
 *
 * @returns uuid branded type
 */
export function randomUuid(): uuid {
    return v4() as uuid;
}
