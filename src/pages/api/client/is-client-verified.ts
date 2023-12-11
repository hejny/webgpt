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

    /*
    TODO: !!!last Remove 
    const clientId = request.query.clientId;

    if (!isValidClientId(clientId)) {
        return response.status(400).json(
            {
                message: 'GET param clientId is not valid client ID' /* <- TODO: [🌻] Unite wrong GET param message * /,
            } as any /* <-[🌋] * /,
        );
    }

    const selectResult = await getSupabaseForServer().from('Client').select('email').eq('clientId', clientId).limit(1);

    if ((selectResult.data?.length || 0) > 0) {
        return response
            .status(200)
            .json({ isClientInserted: true, isClientVerified: false } satisfies IsClientVerifiedResponse);
    }

    return response
        .status(200)
        .json({ isClientInserted: false, isClientVerified: false } satisfies IsClientVerifiedResponse);

    */
}

/**
 * TODO: [🌯] Create some system (simmilar to Workerify) which can create server functions exposed in client through API in some DRY way
 * TODO: [🌯][🌋] Error handling
 */
