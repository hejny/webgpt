import { uuid } from '../typeAliases';
import { provideClientIdWithoutVerification } from './provideClientIdWithoutVerification';

interface IProvideClientIdOptions {
    /**
     * !!!
     */
    isVerifiedEmailRequired?: boolean;
}

/**
 * Checks if clientId is in localStorage and verified OR generates new one and pops up the dialogue to verify email
 *
 * Note: This function is available only in browser
 *
 * @returns clientId
 */
export async function provideClientId(options: IProvideClientIdOptions): Promise<uuid> {
    const { isVerifiedEmailRequired } = options;

    if (isVerifiedEmailRequired) {
        console.warn(`isVerifiedEmailRequired is not implemented yet`);
    }


    const clientId = provideClientIdWithoutVerification();



        // !!! Implement



        

    return clientId;
}

/**
 * TODO: Implement isVerifiedEmailRequired
 * TODO: [🧠] This should be probbably in some other folder than supabase
 */
