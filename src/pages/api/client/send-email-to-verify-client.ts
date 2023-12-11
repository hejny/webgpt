import type { NextApiRequest, NextApiResponse } from 'next';
import type { SendEmailToVerifyClientResult } from '../../../utils/client/sendEmailToVerifyClient.types';
import { $sendEmailToVerifyClientForServer } from '../../../utils/client/sendEmailToVerifyClientForServer';

export default async function sendEmailToVerifyClientHandler(
    request: NextApiRequest,
    response: NextApiResponse<SendEmailToVerifyClientResult>,
) {
    if (request.method !== 'POST') {
        return response.status(400).json({ message: 'Only POST method is allowed' } as any);
    }

    const result = await $sendEmailToVerifyClientForServer(request.body);

    return response.status(202).json(result);
}

/**
 * TODO: [🌯] Create some system (simmilar to Workerify) which can create server functions exposed in client through API in some DRY way
 * TODO: [🌯][🌋] Error handling
 */
