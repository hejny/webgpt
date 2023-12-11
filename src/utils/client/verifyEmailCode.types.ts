import type { client_id, string_token } from '../typeAliases';

export type VerifyEmailCodeRequest = {
    clientId: client_id;
    email: string_token;
};

export type VerifyEmailCodeResult = {
    isVerificationSuccessful: boolean;
};

/**
 * TODO: !!!last Annotate all
 */
