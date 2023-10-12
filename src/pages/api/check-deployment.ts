import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidDomain } from '../../utils/domains/isValidDomain';

export interface CheckDeploymentHandlerResponse {
    /**
     * Type of app running on the domain
     */
    appRunning: 'WEBGPT' | 'UNKNOWN' | 'NOTHING';

    /**
     * Is the page fully deployed
     */
    isFullyReady: boolean;

    // TODO: [🧠] checkedAt: string_date;
    // TODO: [🧠] isSslCertificateReady: boolean;
    // TODO: [⛱] buildId: string;
}

/**
 * API endpoint handler for checking domain deployment
 */
export default async function checkDeploymentHandler(
    request: NextApiRequest,
    response: NextApiResponse<CheckDeploymentHandlerResponse>,
) {
    const domain = request.query.domain;

    if (typeof domain !== 'string') {
        return response.status(400).json(
            {
                message: `You need to specify a domain in the query.`,
            } as any /* <- TODO: Type helper ResponseWithError<T> */,
        );
    }

    if (!isValidDomain(domain)) {
        return response.status(400).json(
            {
                message: `Domain needs to be valid.`,
            } as any /* <- TODO: Type helper ResponseWithError<T> */,
        );
    }

    const publicUrl = `https://${domain}`;

    let appRunning: CheckDeploymentHandlerResponse['appRunning'];
    let isFullyReady = false;

    try {
        const fetchResponse = await fetch(publicUrl, {
            headers: {
                'Cache-Control': 'no-cache',
            },
        });

        // TODO: Better check

        isFullyReady = fetchResponse.ok;
        appRunning = 'WEBGPT' /* <- TODO: !!! Do not assume this */;
    } catch (error) {
        appRunning = 'NOTHING';
    }

    return response.status(200).json({ appRunning, isFullyReady } satisfies CheckDeploymentHandlerResponse);
}
