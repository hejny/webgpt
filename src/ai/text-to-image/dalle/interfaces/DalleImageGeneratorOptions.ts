import { CommonExecutionToolsOptions } from '@promptbook/types';
import { uuid } from '../../../../utils/typeAliases';

/**
 * Options for Dalle image generator by OpenAI
 */
export interface DalleImageGeneratorOptions extends CommonExecutionToolsOptions {
    /**
     * Client responsible for the requests
     */
    clientId: uuid;
}

/**
 * TODO: !!! here should be MAYBE dalle version
 *
 */
