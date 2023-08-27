import OpenAI from 'openai';
import { OPENAI_API_KEY } from '../../../config';
import { isRunningInNode } from '../../utils/isRunningInWhatever';

/**
 * Internal cache for getOpenaiForServer
 * @private
 * @singleton
 */
let openai: OpenAI;

/**
 * Get OpenAI client
 *
 * Note: The client is cached, so it's safe to call this function multiple times
 * Note: This function is available ONLY in server/node
 *
 * @returns instance of OpenAI client
 */
export function getOpenaiForServer(): OpenAI {
    if (!isRunningInNode()) {
        throw new Error('OpenAI is only available on the server');
    }

    if (!openai) {
        openai = new OpenAI({
            apiKey: OPENAI_API_KEY!,
        });
    }

    return openai;
}
