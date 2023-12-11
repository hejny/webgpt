import type { client_id, string_email } from '../typeAliases';

/**
 * Arguments for $sendEmailToVerify function
 */
export type SendEmailToVerifyClientRequest = {
    clientId: client_id;
    email: string_email;
};

/**
 * Result of $sendEmailToVerify function
 */
export type SendEmailToVerifyClientResult =
    | {
          /**
           * Indicates the status of client verification
           */
          status: 'EMAIL_SENT' | 'ALREADY_VERIFIED' | 'ALREADY_EMAIL_SENT' | 'LIMIT_REACHED';
      }
    | {
          /**
           * Indicates the failed status of client verification
           */
          status: 'ERROR';

          /**
           * Indicates the reason of failure
           */
          message: string;
      };
