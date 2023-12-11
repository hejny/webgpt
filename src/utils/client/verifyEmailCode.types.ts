import type { client_id, string_token } from '../typeAliases';

/**
 * Arguments for $verifyEmailCode function
 */
export type VerifyEmailCodeRequest = {
    clientId: client_id;
    email: string_token;
    code: string_token;
};

/**
 * Result of $verifyEmailCode function
 */
export type VerifyEmailCodeResult =
    | {
          /**
           * Indicates the status of client verification
           */
          status: 'VERIFIED' /*| 'ALREADY_VERIFIED' | 'EXPIRED'*/;
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
