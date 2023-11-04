import { NEXT_PUBLIC_OUR_DOMAINS } from '../../../config';
import type { CheckDeploymentHandlerResponse } from '../../pages/api/check-deployment';
import type { string_domain } from '../typeAliases';
import type { DomainStatus } from './DomainStatus';
import { getDomainStatusFromWhois } from './getDomainStatusFromWhois';
import { isSubdomainOf } from './isSubdomainOf';
import { lookupDomain } from './lookupDomain';

/**
 * Checks domain or subdomain availability
 *
 * Note: There are two similar functions !!!! :
 *     - **checkDomain** which checks both whois of second level domains and availability of 3rd level our domains
 *     - **checkWhoisForBrowser** which checks only whois of second level domains
 */
export async function checkDomain(domain: string_domain): Promise<keyof typeof DomainStatus> {
    for (const ourDomain of NEXT_PUBLIC_OUR_DOMAINS) {
        if (isSubdomainOf(domain, ourDomain)) {
            const response = await fetch(`/api/check-deployment?domain=${domain}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                },
            });
            const { appRunning } = (await response.json()) as CheckDeploymentHandlerResponse;

            if (appRunning === 'WEBGPT') {
                return 'REGISTERED';
            } else if (appRunning === 'UNKNOWN') {
                return 'UNKNOWN';
            } else if (appRunning === 'NOTHING') {
                return 'AVAILABLE';
            }
        }
    }

    try {
        const domainLookupResult = await lookupDomain(domain);
        return getDomainStatusFromWhois(domainLookupResult);
    } catch (error) {
        if (!(error instanceof Error)) {
            throw error;
        }

        if (error.message === 'Domain lookup failed') {
            return 'LIMIT';
        }

        throw error;
    }
}

/**
 * TODO: This should work for both browser and server
 */
