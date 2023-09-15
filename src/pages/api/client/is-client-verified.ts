import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabaseForServer } from '../../../utils/supabase/getSupabaseForServer';
import { isValidClientId } from '../../../utils/validators/isValidClientId';

export interface IsClientVerifiedResponse {
    // TODO: [🌋] ErrorableResponse

    /**
     * Is client inserted into the database
     */
    isClientInserted: boolean;

    /**
     * Is client verified by email
     */
    isClientVerified: boolean;
}

export default async function isClientVerifiedHandler(
    request: NextApiRequest,
    response: NextApiResponse<IsClientVerifiedResponse>,
) {
    const clientId = request.query.clientId;

    if (!isValidClientId(clientId)) {
        return response.status(400).json({ message: 'GET param clientId is not valid client ID' } as any /* <-[🌋] */);
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
}
