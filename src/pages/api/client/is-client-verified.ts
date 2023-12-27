import type { NextApiRequest, NextApiResponse } from 'next';
import type { IsClientVerifiedResult } from '../../../utils/client/isClientVerified.types';
import { $isClientVerifiedForServer } from '../../../utils/client/isClientVerifiedForServer';

export default async function isClientVerifiedHandler(
    request: NextApiRequest,
    response: NextApiResponse<IsClientVerifiedResult>,
) {
    if (request.method !== 'POST') {
        return response.status(400).json({ message: 'Only POST method is allowed' } as any);
    }

    const result = await $isClientVerifiedForServer(request.body);

    return response.status(202).json(result);
}

/**
 * TODO: [🌯] Create some system (simmilar to Workerify) which can create server functions exposed in client through API in some DRY way
 * TODO: [🌯][🌋] Error handling
 */
