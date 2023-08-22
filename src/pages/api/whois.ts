import type { NextApiRequest, NextApiResponse } from 'next';
import whoiser, { WhoisSearchResult } from 'whoiser';

interface RegisterResponse {
    result: WhoisSearchResult;
}

export default async function whoisHandler(request: NextApiRequest, response: NextApiResponse<RegisterResponse>) {
    const domain = request.query.domain;

    if (typeof domain !== 'string') {
        return response.status(400).json(
            {
                message: `You need to specify a domain in the query.`,
            } as any /* <- TODO: Type helper ResponseWithError<T> */,
        );
    }

    // TODO: !! Limits + checkups
    const result = await whoiser(domain);
    return response.status(200).json({ result } satisfies RegisterResponse);
}

/**
 * TODO: Use instead of WHOIS in-browser RDAP
 *       - @see https://www.npmjs.com/package/node-rdap
 *       - @see https://www.npmjs.com/package/node-rdap
 */
