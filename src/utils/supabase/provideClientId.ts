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

    clientId = window.localStorage.getItem(`clientId`) as uuid;

    // TODO: Use here isValidUuid

    if (clientId) {
        return clientId;
    }

    clientId = randomUuid();
    window.localStorage.setItem(`clientId`, clientId as uuid);

    return clientId as uuid;
}


/**
 * TODO: [🧠] This should be probbably in some other folder than supabase
 */