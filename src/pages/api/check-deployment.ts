import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidDomain } from '../../utils/domains/isValidDomain';

export interface CheckDeploymentHandlerResponse {
    /**
     * Type of app running on the domain
     */
    readonly appRunning: 'WEBGPT' | 'UNKNOWN' | 'NOTHING';

    /**
     * Is the page fully deployed
     */
    readonly isFullyReady: boolean;

    // TODO: [🚈][🧠] checkedAt: string_date;
    // TODO: [🚈][🧠] isSslCertificateReady: boolean;
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
        appRunning = 'WEBGPT' /* <- TODO: [🚈] !! Do not assume this */;
    } catch (error) {
        appRunning = 'NOTHING';
    }

    return response.status(200).json({ appRunning, isFullyReady } satisfies CheckDeploymentHandlerResponse);
}

/*
TODO: Maybe use to check certificate:


/**
 * Checks if the SSL (https) certificate of the given URL is valid
 * /
export async function checkIfCertificateIsValid(url: URL): Promise<boolean> {
    try {
        const response = await fetch(url.href, {
            mode: 'cors',
            headers: {
                'Cache-Control': 'no-cache',
            },
        });
        const certificate = response.headers.get('certificate');
        if (!certificate) {
            return false;
        }

        const certificateJson = JSON.parse(certificate) as any;
        const validTo = new Date(certificateJson.valid_to);
        const now = new Date();
        const isValid = validTo > now;
        return isValid;
    } catch (error) {
        return false;
    }
}





*/
