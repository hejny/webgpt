import { string_domain } from '../typeAliases';
import { isDomainValid } from './isDomainValid';

export function validateDomain(value: unknown): string_domain {
    if (!isDomainValid(value)) {
        throw new Error(`Invalid domain ${value}`);
    }

    return value;
}
