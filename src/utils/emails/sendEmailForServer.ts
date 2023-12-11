import sendgridEmailClient from '@sendgrid/mail';
import { SENDGRID_API_KEY } from '../../../config';
import { maxdownToHtml } from '../../components/Content/Maxdown/maxdownToHtml';
import { removeMarkdownFormatting } from '../content/removeMarkdownFormatting';
import { isRunningInNode } from '../isRunningInWhatever';
import { Email } from './Email';

/**
 * Send an email
 *
 * Note: This function is available ONLY on server/node
 *
 * @returns instance of supabase client
 */
export async function sendEmailForServer(email: Email): Promise<void> {
    if (!isRunningInNode()) {
        throw new Error(
            'Function `getSupabaseForServer` can not be used in browser, use `getSupabaseForBrowser` instead.',
        );
    }

    if (SENDGRID_API_KEY === undefined) {
        throw new Error('SENDGRID_API_KEY is not set in config');
    }

    sendgridEmailClient.setApiKey(SENDGRID_API_KEY);

    const { from = 'pavol@webgpt.cz' /* <- TODO: !!! Put to config */, to, subject, content } = email;

    const text = removeMarkdownFormatting(content); /* <- TODO: !!! What about links */
    const html = maxdownToHtml(content);

    const sendgridEmail = {
        from,
        to,
        subject,
        text,
        html,
    };

    await sendgridEmailClient.send(sendgridEmail);

    /*
    TODO: Look at what returned sendgridEmailClient.send
    > const sendingResult =await sendgridEmailClient.send(sendgridEmail);
    > 
    > if (sendingResult.statusCode !== 202) {
    >     throw new Error(`Email sending failed: ${JSON.stringify(sendingResult)}`);
    > }
    */
}

/**
 * TODO: !!! Translations
 */
