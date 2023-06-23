import type WhoisSearchResult from 'whoiser';

export function isDomainRegistered(whois: typeof WhoisSearchResult): boolean {
    if (whois === null) {
        return false;
    }

    for (const dns of Object.values(whois)) {
        const domainStatus = dns['Domain Status'];
        if (Array.isArray(domainStatus) && domainStatus.length > 0) {
            return true;
        }
    }

    return false;
}
