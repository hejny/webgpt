import { randomUuid } from '../randomUuid';
import { client_id } from '../typeAliases';

/**
 * Generates fresh clientId
 *
 * Note: Consider using provideClientId instead which probbably does the stuff you want
 *
 * @returns clientId
 */
export function $generateClientId(): client_id {
    return randomUuid() as client_id;
}
