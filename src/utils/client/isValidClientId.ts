import type { client_id } from '../typeAliases';
import { isValidUuid } from '../validators/isValidUuid';

/**
 * Checks if value is valid client id
 */
export function isValidClientId(value: unknown): value is client_id {
    return isValidUuid(value);
}
