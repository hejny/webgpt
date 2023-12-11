import type { client_id } from '../typeAliases';

export type IsClientVerifiedRequest = {
    clientId: client_id;
};

export type IsClientVerifiedResult = {
    isClientVerified: boolean;
};

/**
 * TODO: !!!last Annotate all
 */
