import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

import { IS_DEVELOPMENT, OPENAI_API_KEY } from '../config';
import { DalleImageGenerator } from '../src/ai/text-to-image/dalle/DalleImageGenerator';
import { SupabaseLoggerWrapperOfImageGenerator } from '../src/ai/text-to-image/logger/SupabaseLoggerWrapperOfImageGenerator';
import { runRemoteImageGeneratorServer } from '../src/ai/text-to-image/remote/runRemoteImageGeneratorServer';

runRemoteImageGeneratorServer({
    isVerbose: false /* <- Note: [3] We want server to be silent and OpenAiExecutionTools to be verbose */,
    port: 4446 /* <- TODO: Unhardcode (all ports) */,
    path: '/promptimage/socket.io',
    createImageGenerator(clientId) {
        return new SupabaseLoggerWrapperOfImageGenerator({
            isVerbose: false /* <- Note: [3] */,
            clientId,
            imageGenerator: new DalleImageGenerator({
                isVerbose: IS_DEVELOPMENT /* <- Note: [3] */,
                openAiApiKey: OPENAI_API_KEY!,
                user: clientId,
            }),
        });
    },
});

/**
 * TODO: [🃏] Pass here some security token to prevent DDoS
 */
