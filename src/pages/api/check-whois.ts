import type { NextApiRequest, NextApiResponse } from 'next';
//import freewhois from 'freewhois';
import { parseDomain } from 'whoisserver-world';
import { DomainLookupResult } from '../../utils/domains/DomainLookupResult';
import { isDomainValid } from '../../utils/domains/isDomainValid';

export interface CheckWhoisHandlerResponse {
    readonly domainLookupResult: DomainLookupResult;
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

    if (!isDomainValid(domain)) {
        return response.status(400).json(
            {
                message: `Domain needs to be valid.`,
            } as any /* <- TODO: Type helper ResponseWithError<T> */,
        );
    }

    // TODO: !! Allow ONLY 2nd level domains

    const tdlInfo = parseDomain(domain);

    let domainLookupResult: DomainLookupResult | null = null;

    for (const rdapServer of tdlInfo.rdapServers) {
        try {
            const response = await fetch(`${rdapServer}/${domain}`);
            domainLookupResult = await response.json();

            if (domainLookupResult !== null) {
                break;
            }
        } catch (error) {
            if (!(error instanceof Error)) {
                throw error;
            }

            console.error(error);
        }
    }

    if (domainLookupResult === null) {
        return response.status(400).json(
            {
                message: `Domain lookup failed.`,
            } as any /* <- TODO: Type helper ResponseWithError<T> */,
        );
    }

    // TODO: !! Limits + checkups
    // const whois = await whoiser(domain);
    return response.status(200).json({
        domainLookupResult,
        tdlInfo,
        // domainLookupResult: await rdapDomain(domain),
    } satisfies CheckWhoisHandlerResponse);
}

/**
 * TODO: Cache here
 */
