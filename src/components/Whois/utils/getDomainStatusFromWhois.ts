import type WhoisSearchResult from 'whoiser';
import { DomainStatus } from './DomainStatus';

export function getDomainStatusFromWhois(whois: typeof WhoisSearchResult): keyof typeof DomainStatus {
    if (whois === null) {
        return 'UNKNOWN';
    }

    for (const dns of Object.values(whois)) {
        if (dns.Registrar) {
            return 'REGISTERED';
        }

        const domainStatus = dns['Domain Status'];

        if (Array.isArray(domainStatus) && domainStatus.length > 0) {
            return 'REGISTERED';
        }

        let text = dns['text'];

        if (Array.isArray(text)) {
            text = text.join('\n');
        }

        if (typeof text === 'string' && text.includes('limit exceeded')) {
            return 'LIMIT';
        }
    }

    return 'AVAILABLE';
}
