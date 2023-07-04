import { isValidUuid } from './isValidUuid';
import { uuid } from './typeAliases';

export function validateUuid(value: unknown): uuid {
    if (!isValidUuid(value)) {
        throw new Error(`Invalid uuid ${value}`);
    }

    return value;
}

/**
 * TODO: Can there be used (asserts value is uuid) with uuid return type?
 */
