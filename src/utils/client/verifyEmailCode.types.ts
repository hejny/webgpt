import type { client_id, string_token } from '../typeAliases';

export type VerifyEmailCodeRequest = {
    clientId: client_id;
    email: string_token;
    code: string_token;
};

export type VerifyEmailCodeResult =
    | {
          status: 'VERIFIED' /*| 'ALREADY_VERIFIED' | 'EXPIRED'*/;
      }
    | {
          status: 'ERROR';
          message: string;
      };

/**
 * TODO: !!!last Annotate all
 */
