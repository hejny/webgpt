import { string_email } from '@promptbook/types';
import { string_maxdown } from '../typeAliases';

/**
 * One email
 */
export interface Email {
    /**
     * Email address of sender
     * 
     * Note: If not set, default value !!! from config is used
     */
    readonly from?: string_email;

    /**
     * Email address of recipient
     */
    readonly to: string_email;

    /**
     * Email subject
     */
    readonly subject: string;

    /**
     * Email content
     *
     * Note: The content is in maxdown format, it will be automatically converted to plain text + html before sending
     */
    readonly content: string_maxdown;
}


/**
 * TODO: !!! Translations
 */