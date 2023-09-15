import { isRunningInBrowser } from '../isRunningInWhatever';
import { randomUuid } from '../randomUuid';
import { uuid } from '../typeAliases';

let clientId: uuid | null = null;



interface IProvideClientIdOptions  {

    /**
     * !!!
     */
    isEmailRequired?: boolean;

    /**
     * !!!
     */
    isVerifiedEmailRequired?: boolean;
}




export function provideClientId(options: IProvideClientIdOptions): uuid {
    
    if (!isRunningInBrowser()) {
        throw new Error(`provideClientId is available only in browser`);
    }

    const { isEmailRequired, isVerifiedEmailRequired } = options;

    if (isVerifiedEmailRequired && isEmailRequired) {
    throw ne
    }

    if(isVerifiedEmailRequired){

    }

    // !!! Implement

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