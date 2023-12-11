import type { client_id } from '../typeAliases';

/**
 * Arguments for $isClientVerified function
 */
export type IsClientVerifiedRequest = {
    clientId: client_id;
};

/**
 * Result of $isClientVerified function
 */
export type IsClientVerifiedResult = {

    /**
     * Indicates the status of client verification
     */
    status: 'NOT_VERIFIED' |'EMAIL_SENT' | 'VERIFIED';
};
