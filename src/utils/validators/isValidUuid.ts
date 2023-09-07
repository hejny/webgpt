import { uuid } from '../typeAliases';

export function isValidUuid(value: unknown): value is uuid {
    if (typeof value !== 'string') {
        return false;
    }

    return /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i.test(value);
}
