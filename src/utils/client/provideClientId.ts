import { IsClientVerifiedResponse } from '../../pages/api/client/is-client-verified';
import { validateEmailDialogue } from '../../workers/dialogues/validate-email/validateEmailDialogue';
import { getSupabaseForBrowser } from '../supabase/getSupabaseForBrowser';
import { client_id, string_email } from '../typeAliases';
import { isValidEmail } from '../validators/isValidEmail';
import { $provideClientIdWithoutVerification } from './provideClientIdWithoutVerification';

/**
 * TODO: !!! Remove ACRY isVerifiedEmailRequired, IS_VERIFIED_EMAIL_REQUIRED, [Vv]erif[iy]
 */

export interface IProvideClientIdOptions {
    /**
     * Is required to have verified email
     * - If `false`, just putting in the email will be enough
     * - If `true`, user will must verify the email
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
export async function $provideClientId(options: IProvideClientIdOptions): Promise<client_id> {
    const { isVerifiedEmailRequired = false } = options;

    const clientId = $provideClientIdWithoutVerification();

    // TODO: !!! Use isClientVerifiedForBrowser instead
    // TODO: !!! Use propperly - send ONLY when user requests it
    const response = await fetch(
        `/api/client/is-client-verified?clientId=${/* <- TODO: [⛹️‍♂️] Send clientId through headers */ clientId}`,
    );
    const { isClientInserted /* [0],isClientVerified */ } = (await response.json()) as IsClientVerifiedResponse;

    if (isClientInserted) {
        return clientId;
    }

    // TODO: !!! validateEmailDialogue
    const { email, isEmailVerified } = await validateEmailDialogue({
        // [🍀] Maybe allow to pass default value for email
        isVerifiedEmailRequired,
    });

    if (!isValidEmail(email)) {
        throw new Error(`Invalid email`);
    }

    window.localStorage.setItem(`clientEmail`, email as string_email);
    await getSupabaseForBrowser().from('Client').insert({ clientId, email });

    return clientId;
}

/**
 * TODO: [0] !!! Implement isVerifiedEmailRequired
 */
