import sgMail from '@sendgrid/mail';
import type { NextApiRequest, NextApiResponse } from 'next';
import { SENDGRID_API_KEY } from '../../../../config';

export default async function sendEmailExperimentHandler(request: NextApiRequest, response: NextApiResponse) {
    sgMail.setApiKey(SENDGRID_API_KEY! /* <- TODO: !!! Check config */);
    const email = {
        to: 'me@pavolhejny.com',
        from: 'pavol@webgpt.cz',
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };

    try {
        const sendingResult = await sgMail.send(email);

        console.info(sendingResult);

        return response.status(201).send({
            message: 'Email sent',
        });
    } catch (error) {
        console.error(error);

        if (!(error instanceof Error)) {
            throw error;
        }

        return response.status(500).send({
            message: 'Email sending failed',
            error: { message: error.message },
        });
    }
}
