import type { client_id } from '../typeAliases';

export type IsClientVerifiedRequest = {
    clientId: client_id;
};

export type IsClientVerifiedResult = {
    status: 'NOT_VERIFIED' |'EMAIL_SENT' | 'VERIFIED';
};

/**
 * TODO: !!!last Annotate all
 */
