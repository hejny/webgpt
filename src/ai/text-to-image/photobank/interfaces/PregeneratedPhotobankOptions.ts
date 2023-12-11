import { CommonExecutionToolsOptions } from '@promptbook/types';
import { client_id } from '../../../../utils/typeAliases';

/**
 * Search options for the pregenerated photobank
 */
export interface PregeneratedPhotobankOptions extends CommonExecutionToolsOptions {
    /**
     * Client ID for the GPT usage
     */
    clientId: client_id;
}
