import type { DomainLookupResult } from './DomainLookupResult';
import { DomainStatus } from './DomainStatus';

export function getDomainStatusFromWhois(domainLookupResult: DomainLookupResult): keyof typeof DomainStatus {
    if (domainLookupResult === null) {
        return 'UNKNOWN';
    }

    for (const dns of Object.values(domainLookupResult)) {
        if ((dns as DomainLookupResult).Registrar) {
            return 'REGISTERED';
        }

        const domainStatus = (dns as DomainLookupResult)['Domain Status'];

        if (Array.isArray(domainStatus) && domainStatus.length > 0) {
            return 'REGISTERED';
        }

        let text = (dns as DomainLookupResult)['text'];

        if (Array.isArray(text)) {
            text = text.join('\n');
        }

        if (typeof text === 'string' && text.includes('limit exceeded')) {
            return 'LIMIT';
        }
    }

    return 'AVAILABLE';
}

/**
 * TODO: This should be ERROR: {"nonce":0,"whois":{"whois.verisign-grs.com":{"error":"getaddrinfo ENOTFOUND whois.verisign-grs.com"}}}
 */
