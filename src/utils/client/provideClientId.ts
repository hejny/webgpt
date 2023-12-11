import { validateEmailDialogue } from '../../workers/dialogues/validate-email/validateEmailDialogue';
import { client_id } from '../typeAliases';
import { $isClientVerifiedForBrowser } from './isClientVerifiedForBrowser';
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
 * Provides verified clientId
 *
 * 1) If the `clientId` is not in localStorage, generates new one
 * 2) If the `clientId` is in localStorage, checks if it is verified
 * 3) If the is not verified, pops up the dialogue to verify email
 *
 * Note: This function is available only in browser
 *
 * @returns clientId
 */
export async function $provideClientId(options: IProvideClientIdOptions): Promise<client_id> {
    const { isVerifiedEmailRequired = false } = options;

    const clientId = $provideClientIdWithoutVerification();

    const { status } = await $isClientVerifiedForBrowser({ clientId });

    if (status === 'VERIFIED') {
        return clientId;
    }

    await validateEmailDialogue({
        // [🍀] Maybe allow to pass default value for email
        isVerifiedEmailRequired,
    });

    // Note: Dialogue validateEmailDialogue will never resolve if email is not verified

    return clientId;
}

/**
 * TODO: [0] !!! Implement isVerifiedEmailRequired
 */
