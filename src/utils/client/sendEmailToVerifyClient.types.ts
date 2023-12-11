import type { client_id, string_email } from '../typeAliases';

export type SendEmailToVerifyClientRequest = {
    clientId: client_id;
    email: string_email;
};

export type SendEmailToVerifyClientResult =
    | {
          status: 'EMAIL_SENT' | 'ALREADY_VERIFIED' | 'ALREADY_EMAIL_SENT' | 'LIMIT_REACHED';
      }
    | {
          status: 'ERROR';
          message: string;
      };

/**
 * TODO: !!!last Annotate all
 */
