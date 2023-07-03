import { randomUuid } from '../randomUuid';
import { uuid } from '../typeAliases';

let clientId: uuid | null = null;

export function provideClientId(): uuid {
    if (!window) {
        throw new Error(`provideClientId is available only in browser`);
    }

    if (clientId) {
        return clientId;
    }

    clientId = localStorage.getItem(`clientId`) as uuid;

    // TODO: Use here isValidUuid

    if (clientId) {
        return clientId;
    }

    clientId = randomUuid();
    localStorage.setItem(`clientId`, clientId as uuid);

    return clientId as uuid;
}
