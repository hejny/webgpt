import { isRunningInNode } from '../isRunningInWhatever';
import { getSupabaseForServer } from '../supabase/getSupabaseForServer';
import type { VerifyEmailCodeRequest, VerifyEmailCodeResult } from './verifyEmailCode.types';

/**
 * Function verifyEmailCodeForServer checks if verification code is correct
 * If it is correct, it marks client as verified in the database
 *
 * Note: This function has version both for browser and server
 */
export async function $verifyEmailCodeForServer(options: VerifyEmailCodeRequest): Promise<VerifyEmailCodeResult> {
    if (!isRunningInNode()) {
        throw new Error(
            'Function `$verifyEmailCodeForBrowser` can not be used in browser or worker, use browser version instead.',
        );
    }

    const { clientId, email, code } = options;

    const { data: verificationRequests } = await getSupabaseForServer()
        // TODO: [🍠] Put here some time limit
        .from('ClientEmailVerificationRequest')
        .select('id,createdAt,code,email')
        .eq('clientId', clientId)
        .eq('email', email);

    for (const verificationRequest of verificationRequests || []) {
        if (verificationRequest.code === code && verificationRequest.email === email) {
            const insertVerificationResult = await getSupabaseForServer().from('ClientEmailVerification').insert({
                verificationRequestId: verificationRequest.id,
            });

            // TODO: !! Util isInsertSuccessfull (status===201)
            console.info({ insertVerificationResult });

            return {
                status: 'VERIFIED',
            };
        }
    }

    return {
        status: 'ERROR',
        message: 'Verification code is not correct', // <- TODO: [🧠] Translations in server messages
    };
}

/**
 * TODO: [🌯] Create some system (simmilar to Workerify) which can create server functions exposed in client through API in some DRY way
 * TODO: !! Use or remove status ALREADY_VERIFIED
 * TODO: !! Use or remove status EXPIRED
 * TODO: !!! Implement
 * TODO: !!!last Annotate
 */
