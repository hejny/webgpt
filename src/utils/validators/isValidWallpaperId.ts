import { uuid } from '../typeAliases';

export function isValidWallpaperId(value: unknown): value is uuid {
    if (typeof value !== 'string') {
        return false;
    }

    return true;
}

/**
 * TODO: Implement (maybe async)
 * TODO: Test
 */
