import { client_id, string_email, string_token } from '../../utils/typeAliases';

/**
 * Data for automatic verification, this data will be in the link in verification email
 */
export type AutomaticVerification = {
    /**
     * Verification code
     */
    code: string_token;

    /**
     * Client email
     * Note: This is double check
     */
    email: string_email;

    /**
     * Client id
     * Note: This is double check, because user can open the link on different device
     */
    clientId: client_id;
};
