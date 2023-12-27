import { v4 } from 'uuid';
import { uuid } from './typeAliases';

/**
 * Generates random UUID v4
 *
 * @returns uuid branded type
 */
export function $randomUuid(): uuid {
    return v4() as uuid;
}
