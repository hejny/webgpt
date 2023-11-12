import { IsClientVerifiedResponse } from '../../pages/api/client/is-client-verified';
import { simpleTextDialogue } from '../../workers/dialogues/simple-text/simpleTextDialogue';
import { string_email, uuid } from '../typeAliases';
import { isValidEmail } from '../validators/isValidEmail';
import { getSupabaseForBrowser } from './getSupabaseForBrowser';
import { provideClientIdWithoutVerification } from './provideClientIdWithoutVerification';

export interface IProvideClientIdOptions {
    /**
     * Is required to have verified email
     * - If `false`, just putting in the email will be enough
     * - If `true`, user will must verify the email
     *
     * Note: [0] Not implemented yet - it will be ignored
     */
    readonly isVerifiedEmailRequired?: boolean;
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

    const response = await fetch(
        `/api/client/is-client-verified?clientId=${/* <- TODO: [⛹️‍♂️] Send clientId through headers */ clientId}`,
    );
    const { isClientInserted /* [0],isClientVerified */ } = (await response.json()) as IsClientVerifiedResponse;

    if (isClientInserted) {
        return clientId;
    }

    const { answer: email } = await simpleTextDialogue({
        prompt: `Please write your email`,
        placeholder: `john.smith@gmail.com`,
        defaultValue: `@`,
    });

    if (!isValidEmail(email)) {
        throw new Error(`Invalid email`);
    }

    window.localStorage.setItem(`clientEmail`, email as string_email);
    await getSupabaseForBrowser().from('Client').insert({ clientId, email });

    return clientId;
}

/**
 * TODO: [0] Implement isVerifiedEmailRequired
 * TODO: [🧠] This should be probbably in some other folder than supabase
 */
