import type WhoisSearchResult from 'whoiser';

export const DomainStatus = {
    AVAILABLE: 'Available',
    REGISTERED: 'Registered',
    UNKNOWN: 'Unknown',
} as const;

export function getDomainStatusFromWhois(whois: typeof WhoisSearchResult): keyof typeof DomainStatus {
    if (whois === null) {
        return 'UNKNOWN';
    }

    for (const dns of Object.values(whois)) {
        const domainStatus = dns['Domain Status'];
        if (Array.isArray(domainStatus) && domainStatus.length > 0) {
            return 'REGISTERED';
        }
    }

    return 'AVAILABLE';
}
