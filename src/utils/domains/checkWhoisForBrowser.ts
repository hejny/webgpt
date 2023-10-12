import type { WhoisSearchResult } from 'whoiser';
import { WhoisHandlerResponse } from '../../pages/api/check-whois';
import { isRunningInBrowser } from '../isRunningInWhatever';
import { string_domain } from '../typeAliases';
import { DomainStatus } from './DomainStatus';
import { getDomainStatusFromWhois } from './getDomainStatusFromWhois';
import { isValidDomain } from './isValidDomain';

/**
 * Checks domain availability using whois
 *
 * Note: There are two similar functions:
 *     - **checkDomain** which checks both whois of second level domains and availability of 3rd level our domains
 *     - **checkWhoisForBrowser** which checks only whois of second level domains
 * Note: This function is available ONLY in browser
 *
 * @returns instance of supabase client
 */
export async function checkWhoisForBrowser(domain: string_domain): Promise<{
    domainStatus: keyof typeof DomainStatus;
    whois: WhoisSearchResult;
}> {
    if (!isRunningInBrowser()) {
        throw new Error(`This function is available ONLY in browser`);
    }

    if (!isValidDomain(domain)) {
        throw new Error(`Domain needs to be valid.`);
    }

    // TODO: !!!! Allow ONLY 2nd level domains

    // TODO: !!!! Allow ONLY valid TDLs

    const response = await fetch(`/api/check-whois?domain=${domain}`, {
        headers: {
            'Cache-Control': 'no-cache',
        },
    });
    const { whois } = (await response.json()) as WhoisHandlerResponse;
    const domainStatus = getDomainStatusFromWhois(whois);

    return { domainStatus, whois };
}

/**
 * TODO: Maybe cache in localStorage
 */
