import type { WhoisSearchResult } from 'whoiser';
import { DomainStatus } from './DomainStatus';

export function getDomainStatusFromWhois(whois: WhoisSearchResult): keyof typeof DomainStatus {
    if (whois === null) {
        return 'UNKNOWN';
    }

    for (const dns of Object.values(whois)) {
        if ((dns as WhoisSearchResult).Registrar) {
            return 'REGISTERED';
        }

        const domainStatus = (dns as WhoisSearchResult)['Domain Status'];

        if (Array.isArray(domainStatus) && domainStatus.length > 0) {
            return 'REGISTERED';
        }

        let text = (dns as WhoisSearchResult)['text'];

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
