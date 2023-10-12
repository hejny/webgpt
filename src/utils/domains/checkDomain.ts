import { NEXT_PUBLIC_OUR_DOMAINS } from '../../../config';
import { string_domain } from '../typeAliases';
import { checkWhoisForBrowser } from './checkWhoisForBrowser';
import { DomainStatus } from './DomainStatus';
import { isSubdomainOf } from './isSubdomainOf';

export async function checkDomain(domain: string_domain): Promise<keyof typeof DomainStatus> {
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
