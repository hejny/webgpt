import type { client_id, string_email } from '../typeAliases';

export type SendEmailToVerifyClientRequest = {
    clientId: client_id;
    email: string_email;
};

export type SendEmailToVerifyClientResult = {
    isSendingEmailSuccessful: boolean;
};

/**
 * TODO: !!!last Annotate all
 */
