import { APP_NAME, NEXT_PUBLIC_URL } from '../../../config';
import { maxdown } from '../../components/Content/Maxdown/maxdown';
import { sendEmailForServer } from '../emails/sendEmailForServer';
import { isRunningInNode } from '../isRunningInWhatever';
import { getSupabaseForServer } from '../supabase/getSupabaseForServer';
import { isValidEmail } from '../validators/isValidEmail';
import { $generateVerificationCode } from './generateVerificationCode';
import { $isClientVerifiedForServer } from './isClientVerifiedForServer';
import type { SendEmailToVerifyClientRequest, SendEmailToVerifyClientResult } from './sendEmailToVerifyClient.types';

/**
 * Function sendEmailToVerifyClientForServer will generate a verification code, saves it into a DB and send it to the email
 *
 * Note: This function internally checks if client is already verified, if yes, it will return ALREADY_VERIFIED
 * Note: This function has version both for browser and server
 */
export async function $sendEmailToVerifyClientForServer(
    options: SendEmailToVerifyClientRequest,
): Promise<SendEmailToVerifyClientResult> {
    if (!isRunningInNode()) {
        throw new Error(
            'Function `$sendEmailToVerifyClient` can not be used in browser or worker, use browser version instead.',
        );
    }

    const { clientId, email } = options;

    if (!isValidEmail(email)) {
        return {
            status: 'ERROR',
            message: 'You have entered invalid email', // <- TODO: [🧠] Translations in server messages
        };
    }

    const { status: currentStatus } = await $isClientVerifiedForServer({
        clientId /* TODO: Check combination with email */,
    });

    if (currentStatus === 'EMAIL_SENT') {
        // TODO: [📮] When tryng after longer time, send another email
        return {
            status: 'ALREADY_EMAIL_SENT',
        };
    } else if (currentStatus === 'VERIFIED') {
        return {
            status: 'ALREADY_VERIFIED',
        };
    }

    const code = $generateVerificationCode();

    // TODO: Maybe do theese things (insert+email sending) in parallel OR transaction but not indipedently at series
    await getSupabaseForServer().from('ClientEmailVerificationRequest').insert({ clientId, email, code });
    await sendEmailForServer({
        to: email,
        subject: `⏣ ${APP_NAME} verification code`,
        content:
            // TODO: !!! Better text
            // TODO: !!! Translations
            // TODO: !!! Add verification link alongsite the code
            // TODO: !!! Unify greeting and signature in all emails ACRY
            maxdown`
                Hello,
                Your code to sign-in into ${APP_NAME} is:

                **${code}**

                Or click on this link to verify your email:
                
                ${NEXT_PUBLIC_URL.href}verify-email?code=${code}&email=${encodeURIComponent(
                email,
            )}&clientId=${encodeURIComponent(clientId)}
                
                ---
                
                !!! Add wait dislaimer for people whos email this isnt !!!
            `,
    });

    return {
        // TODO: !!! Handle errors and report false
        status: 'EMAIL_SENT',
    };
}

/**
 * TODO: [🌯] Create some system (simmilar to Workerify) which can create server functions exposed in client through API in some DRY way
 *
 * TODO: !!! Implement
 * TODO: !!!last Annotate
 * TODO: !!! Create DB view for jirka to be DB costs, feedbac etc visible for him
 * TODO: !!! Referral system
 * TODO: [🧠] Some unification method how to attribute costs to unique people
 *       - franta.novak@gmail.com -> franta.novak@gmail.com
 *       - franta.novak+alias@gmail.com -> franta.novak@gmail.com
 *       - me@pavolhejny.com -> pavolhejny.com
 *       - pavol@pavolhejny.com -> pavolhejny.com
 *       - voxisik917@mcenb.com -> anonymous
 *       - !! [🍏] What about Apple anonymous emails?
 * TODO: [🧠] Some method to detect one-time emails and do not allow them OR strictly warn them
 *       - Like voxisik917@mcenb.com
 *       - !! [🍏] What about Apple anonymous emails?
 */
