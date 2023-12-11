import { isRunningInNode } from '../isRunningInWhatever';
import { getSupabaseForServer } from '../supabase/getSupabaseForServer';
import type { IsClientVerifiedRequest, IsClientVerifiedResult } from './isClientVerified.types';

/**
 * Function isClientVerifiedForServer checks if client has verified email
 *
 * Note: This function has version both for browser and server
 */
export async function $isClientVerifiedForServer(options: IsClientVerifiedRequest): Promise<IsClientVerifiedResult> {
    if (!isRunningInNode()) {
        throw new Error(
            'Function `$isClientVerified` can not be used in browser or worker, use browser version instead.',
        );
    }

    const { clientId } = options;

    const { data: clientEmailVerifications } = await getSupabaseForServer()
        .from('ClientEmailVerification_withRequests')
        .select(
            'verificationRequestId' /* <- Note: This is not used BUT it needs to be set on some existing column to return some result not null */,
        )
        .eq('clientId', clientId);

    if (clientEmailVerifications && clientEmailVerifications.length > 0) {
        return {
            status: 'VERIFIED',
        };
    }

    const { data: clientEmailVerificationsRequests } = await getSupabaseForServer()
        // TODO: [🍠] Put here some time limit
        .from('ClientEmailVerificationRequest')
        .select(
            'verificationRequestId' /* <- Note: This is not used BUT it needs to be set on some existing column to return some result not null */,
        )
        .eq('clientId', clientId);

    if (clientEmailVerificationsRequests && clientEmailVerificationsRequests.length > 0) {
        return {
            status: 'EMAIL_SENT',
        };
    }

    return {
        status: 'NOT_VERIFIED',
    };

    /*
    const selectResult = await getSupabaseForServer().from('Client').select('email').eq('clientId', clientId).limit(1);

    if ((selectResult.data?.length || 0) > 0) {
        return response
            .status(200)
            .json({ isClientInserted: true, isClientVerified: false } satisfies IsClientVerifiedResponse);
    }
    */
}

/**
 * TODO: [🌯] Create some system (simmilar to Workerify) which can create server functions exposed in client through API in some DRY way
 * TODO: !!! Implement
 * TODO: !!!last Annotate
 */
