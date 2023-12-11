import { client_id } from '../typeAliases';
import { isValidUuid } from '../validators/isValidUuid';

export function validateClientId(value: unknown): client_id {
    if (!isValidUuid(value)) {
        throw new Error(`Invalid clientId ${value}`);
    }

    return value as client_id;
}

/**
 * TODO: [🧠][🚓] Is/which combination it better to use asserts/check, validate or is utility function?
 * TODO: Can there be used (asserts value is uuid) with uuid return type?
 */
