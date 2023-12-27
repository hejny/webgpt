import { uuid } from '../typeAliases';
import { isValidUuid } from './isValidUuid';

export function validateUuid(value: unknown): uuid {
    if (!isValidUuid(value)) {
        throw new Error(`Invalid uuid ${value}`);
    }

    return value;
}

/**
 * TODO: [🧠][🚓] Is/which combination it better to use asserts/check, validate or is utility function?
 * TODO: Can there be used (asserts value is uuid) with uuid return type?
 */
