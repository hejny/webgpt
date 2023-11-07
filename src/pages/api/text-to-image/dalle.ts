import { DalleImageGenerator } from '../../../ai/text-to-image/dalle/DalleImageGenerator';
import { createRemoteImageGeneratorRouteHandler } from '../../../ai/text-to-image/remote/createRemoteImageGeneratorRouteHandler';
import type { uuid } from '../../../utils/typeAliases';

export default createRemoteImageGeneratorRouteHandler({
    createImageGenerator(clientId: uuid) {
        return new DalleImageGenerator(clientId);
    },
});
