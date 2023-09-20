import { promptDialog } from '../../components/Dialogs/dialogs/promptDialog';
import type { IsClientVerifiedResponse } from '../../pages/api/client/is-client-verified';
import type { uuid } from '../typeAliases';
import { isValidEmail } from '../validators/isValidEmail';
import { getSupabaseForBrowser } from './getSupabaseForBrowser';
import { provideClientIdWithoutVerification } from './provideClientIdWithoutVerification';

interface IProvideClientIdOptions {
    /**
     * Is required to have verified email
     * - If `false`, just putting in the email will be enough
     * - If `true`, user will must verify the email
     *
     * Note: [0] Not implemented yet - it will be ignored
     */
    isVerifiedEmailRequired?: boolean;
}

/**
 * Checks if clientId is in localStorage and verified OR generates new one and pops up the dialog to verify email
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

    // TODO: !!! promptForm or some verify callback
    // TODO: !!! Add preferences for email receiving
    // TODO: !!! Add preferences

    const email = await promptDialog({
        prompt: `Please write your email`,
        placeholder: `john.smith@gmail.com`,
        defaultValue: `@`,
        isCloseable: true,
    });

    if (!isValidEmail(email)) {
        throw new Error(`Invalid email`);
    }

    await getSupabaseForBrowser().from('Client').insert({ clientId, email });

    return clientId;
}

/**
 * TODO: [🧠] !!! What should happen if user refuses to verify email?
 * TODO: [0] Implement isVerifiedEmailRequired
 * TODO: [🧠] This should be probbably in some other folder than supabase
 */
