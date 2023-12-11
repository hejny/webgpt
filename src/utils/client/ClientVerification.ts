import type { client_id, string_email } from '../typeAliases';

export type ClientEmailVerification = {
    /**
     * The client id under which the email is validated
     */
    readonly clientId: client_id;

    /**
     * The validated/entered email
     */
    readonly email: string_email;

    /**
     * Is the email verified
     */
    readonly isEmailVerified: boolean;
};

/**
 * TODO: [🧠] Maybe isEmailVerified is redundant - ClientEmailVerification by definition is verified
 */
