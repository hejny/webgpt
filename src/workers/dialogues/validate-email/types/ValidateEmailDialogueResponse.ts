import { string_email } from '../../../../utils/typeAliases';
import type { AbstractDialogueResponse } from '../../../lib/dialogues/interfaces/AbstractDialogueResponse';

export type ValidateEmailDialogueResponse = AbstractDialogueResponse & {
    /**
     * The validated/entered email
     */
    readonly email: string_email;

    /**
     * Is the email verified
     */
    readonly isEmailVerified: boolean;
};
