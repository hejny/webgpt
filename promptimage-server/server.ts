import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

import { DalleImageGenerator } from '../src/ai/text-to-image/dalle/DalleImageGenerator';
import { createRemoteImageGeneratorServer } from '../src/ai/text-to-image/remote/createRemoteImageGeneratorServer';

createRemoteImageGeneratorServer({
    isVerbose: false /* <- Note: [3] We want server to be silent and OpenAiExecutionTools to be verbose */,
    port: 4446 /* <- TODO: Unhardcode (all ports) */,
    createImageGenerator(clientId) {
        return new DalleImageGenerator({ clientId });
        // TODO: !!! Put here (or somewhere) Photobank
        // TODO: !! Put here (or somewhere) MidJourney
        //       PregeneratedPhotobank.getInstance()
    },
});

/**
 * TODO: [🃏] Pass here some security token to prevent DDoS
 */
