import spaceTrim from 'spacetrim';
// TODO: !!! Uninstall all unused packages> import { parseDomain } from 'whoisserver-world';
import { isRunningInBrowser } from '../isRunningInWhatever';
import { string_domain, string_url } from '../typeAliases';
import type { DomainLookupResult } from './DomainLookupResult';
import { getDomainLevel } from './getDomainLevel';
import { getDomainTdl } from './getDomainTdl';
import { isDomainValid } from './isDomainValid';

let rdapServices: any = null;

export async function lookupDomain(domain: string_domain): Promise<DomainLookupResult> {
    if (!isRunningInBrowser()) {
        throw new Error(`This function is available ONLY in browser`);
    }

    if (!isDomainValid(domain)) {
        throw new Error(`Domain needs to be valid.`);
    }

    if (getDomainLevel(domain) !== 2) {
        // TODO: [🤞] Maybe allow 3rd level domains like www.ourdomain.com and normalize them to ourdomain.com
        throw new Error(`Only 2nd level domains are allowed`);
    }

    const domainTdl = getDomainTdl(domain);

    if (rdapServices === null) {
        const rdapServicesResponse = await fetch('https://data.iana.org/rdap/dns.json');
        rdapServices = (await rdapServicesResponse.json()) as any;
        console.log('!!!', { rdapServices });
    }

    const rdapServers: Array<string_url> = [];

    for (const [tlds, servers] of rdapServices.services) {
        if (tlds.includes(domainTdl)) {
            rdapServers.push(...servers);
        }
    }

    if (rdapServers.length === 0) {
        throw new Error(
            spaceTrim(`
                No RDAP servers found for TDL ${domainTdl}

                - Is this TDL "${domainTdl}" valid?
            `),
        );
    }

    console.log('!!!', { rdapServers });

    let domainLookupResult: DomainLookupResult | null = null;

    for (const rdapServer of rdapServers) {
        try {
            // TODO: !!! Queue and lock
            const response = await fetch(`${rdapServer}/domain/${domain}`);
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
        throw new Error(`Domain lookup failed`);
    }

    return domainLookupResult;
}

/**
 * TODO: !!! Annotate
 * TODO: Maybe cache in localStorage
 */
