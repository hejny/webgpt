import { CommonExecutionToolsOptions } from '@promptbook/types';
import { uuid } from '../../../../utils/typeAliases';

/**
 * Search options for the pregenerated photobank
 */
export interface PregeneratedPhotobankOptions extends CommonExecutionToolsOptions {
    /**
     * Client ID for the GPT usage
     */
    clientId: uuid;
}
