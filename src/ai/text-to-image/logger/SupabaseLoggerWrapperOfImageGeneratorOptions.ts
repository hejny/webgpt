import type { CommonExecutionToolsOptions } from '@promptbook/types';
import type { client_id } from '../../../utils/typeAliases';
import { ImageGenerator } from '../0-interfaces/ImageGenerator';

/**
 * Options for SupabaseLoggerWrapperOfImageGenerator
 */
export interface SupabaseLoggerWrapperOfImageGeneratorOptions extends CommonExecutionToolsOptions {
    /**
     * Execution tools to use
     * This generator will be wrapped in a logger for each client to log all requests
     */
    readonly imageGenerator: ImageGenerator;

    /**
     * Client responsible for the requests
     */
    readonly clientId: client_id;
}
