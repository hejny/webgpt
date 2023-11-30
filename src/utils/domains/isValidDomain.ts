import { string_domain } from '../typeAliases';

/**
 * Checks if value is valid domain
 */
export function isValidDomain(value: unknown): value is string_domain {
    if (typeof value !== 'string') {
        return false;
    }
    const domainPattern = /^(?!:\/\/)(?![0-9]+$)(?!-)[a-zA-Z0-9-]{1,63}(?<!-)(\.[a-zA-Z0-9-]{2,})+$/;
    return domainPattern.test(value);
}
