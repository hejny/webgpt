import { NEXT_PUBLIC_OUR_DOMAINS } from '../../../config';
import { string_domain } from '../typeAliases';
import { checkWhoisForBrowser } from './checkWhoisForBrowser';
import { DomainStatus } from './DomainStatus';
import { isSubdomainOf } from './isSubdomainOf';

/**
 * Checks domain or subdomain availability
 *
 * Note: There are two similar functions:
 *     - **checkDomain** which checks both whois of second level domains and availability of 3rd level our domains
 *     - **checkWhoisForBrowser** which checks only whois of second level domains
 */
export async function checkDomain(domain: string_domain): Promise<keyof typeof DomainStatus /* <- TODO: !!! Extend this */> {
    for (const ourDomain of NEXT_PUBLIC_OUR_DOMAINS) {
        if (isSubdomainOf(domain, ourDomain)) {
            return 'UNKNOWN' /* <- TODO: !!! Check here our domains */;
        }
    }

    const { domainStatus } = await checkWhoisForBrowser(domain);
    return domainStatus;
}

/**
 * TODO: This should work for both browser and server
 */
