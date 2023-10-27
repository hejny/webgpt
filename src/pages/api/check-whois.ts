import type { NextApiRequest, NextApiResponse } from 'next';
import type { WhoisSearchResult } from 'whoiser';
import whoiser from 'whoiser';
import { isValidDomain } from '../../utils/domains/isValidDomain';

export interface CheckWhoisHandlerResponse {
    readonly whois: WhoisSearchResult;
}

/**
 * API endpoint handler for checking domain availability
 */
export default async function checkWhoisHandler(
    request: NextApiRequest,
    response: NextApiResponse<CheckWhoisHandlerResponse>,
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

    // TODO: !! Allow ONLY 2nd level domains

    // TODO: !! Limits + checkups
    const whois = await whoiser(domain);
    return response.status(200).json({ whois } satisfies CheckWhoisHandlerResponse);
}

/**
 * TODO: Cache here
 * TODO: Use instead of WHOIS in-browser RDAP
 *       - @see https://www.npmjs.com/package/node-rdap
 *       - @see https://www.npmjs.com/package/node-rdap
 */
