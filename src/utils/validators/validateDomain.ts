import { string_domain } from '../typeAliases';
import { isValidDomain } from './isValidDomain';

export function validateDomain(value: unknown): string_domain {
    if (!isValidDomain(value)) {
        throw new Error(`Invalid domain ${value}`);
    }

    return value;
}
