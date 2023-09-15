import { promptDialogue } from '../../components/Dialogues/dialogues/promptDialogue';
import { IsClientVerifiedResponse } from '../../pages/api/client/is-client-verified';
import { uuid } from '../typeAliases';
import { getSupabaseForBrowser } from './getSupabaseForBrowser';
import { provideClientIdWithoutVerification } from './provideClientIdWithoutVerification';

interface IProvideClientIdOptions {
    /**
     * !!!
     *
     * Note: [0] Not implemented yet - it will be ignored
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
        // [0]
        console.warn(`isVerifiedEmailRequired is not implemented yet`);
    }

    const clientId = provideClientIdWithoutVerification();

    const response = await fetch(`/api/client/is-client-verified?clientId=${clientId}`);
    const { isClientInserted /* [0],isClientVerified */ } = (await response.json()) as IsClientVerifiedResponse;

    if (isClientInserted) {
        return clientId;
    }

    // TODO: !!! What if there is no <Dialogies/> mounted
    // TODO: !!! promptForm or some verify callback
    const email = await promptDialogue({
        prompt: `Get verified !!!`,
        placeholder: `!!!`,
        defaultValue: `@`,
    });

    // !!! verify email
    // !!! Add preferences

    await getSupabaseForBrowser().from('Client').insert({ clientId, email });

    return clientId;
}

/**
 * TODO: [0] Implement isVerifiedEmailRequired
 * TODO: [🧠] This should be probbably in some other folder than supabase
 */
