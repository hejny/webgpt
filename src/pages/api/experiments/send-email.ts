import type { NextApiRequest, NextApiResponse } from 'next';
import { maxdown } from '../../../components/Content/Maxdown/maxdown';
import { sendEmailForServer } from '../../../utils/emails/sendEmailForServer';

export default async function sendEmailExperimentHandler(request: NextApiRequest, response: NextApiResponse) {
    try {
        await sendEmailForServer({
            to: 'me@pavolhejny.com',
            subject: '⏣ WebGPT notification',
            content: maxdown`
                Look on [WebGPT](https://webgpt.cz/) page!
            `,
        });

        return response.status(202).send({
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
