import type { NextApiRequest, NextApiResponse } from 'next';
import type { VerifyEmailCodeResult } from '../../../utils/client/verifyEmailCode.types';
import { $verifyEmailCodeForServer } from '../../../utils/client/verifyEmailCodeForServer';

export default async function verifyEmailCodeHandler(
    request: NextApiRequest,
    response: NextApiResponse<VerifyEmailCodeResult>,
) {
    if (request.method !== 'POST') {
        return response.status(400).json({ message: 'Only POST method is allowed' } as any);
    }

    const result = await $verifyEmailCodeForServer(request.body);

    return response.status(202).json(result);
}

/**
 * TODO: [🌯] Create some system (simmilar to Workerify) which can create server functions exposed in client through API in some DRY way
 * TODO: [🌯][🌋] Error handling
 */
