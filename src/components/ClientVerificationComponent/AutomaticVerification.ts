import { client_id, string_email, string_token } from '../../utils/typeAliases';

export type AutomaticVerification = {
    code: string_token;
    email: string_email;
    clientId: client_id;
};

/**
 * TODO: !!!last Annotate all
 */
