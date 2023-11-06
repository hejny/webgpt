import spaceTrim from 'spacetrim';
import { forTime } from 'waitasecond';
import { justTrue } from '../justTrue';
// TODO: !!! Uninstall all unused packages> import { parseDomain } from 'whoisserver-world';
import { string_domain, string_url } from '../typeAliases';
import type { DomainLookupResult } from './DomainLookupResult';
import { getDomainLevel } from './getDomainLevel';
import { getDomainTdl } from './getDomainTdl';
import { isDomainValid } from './isDomainValid';

/**
 * Internal cache of RDAP servers for TDLs provided by IANA.
 *
 * @singleton
 */
let rdapServices: any = null;

/**
 * Performs RDAP lookup for given domain.
 *
 * Note: This function fetches data from external sources.
 * Note: This function can be used both in browser and in node
 *
 * @param domain
 * @returns RDAP response or 'NOT_FOUND' if domain is free
 */
export async function lookupDomain(domain: string_domain): Promise<DomainLookupResult | 'NOT_FOUND'> {
    if (justTrue()) {
        // return { a: 1 } as any;
    }

    if (!isDomainValid(domain)) {
        throw new Error(
            spaceTrim(`

                Domain needs to be valid.

                You provided have provided "${domain}".
            `),
        );
    }

    if (getDomainLevel(domain) !== 2) {
        // TODO: [🤞] Maybe allow 3rd level domains like www.ourdomain.com and normalize them to ourdomain.com
        throw new Error(
            spaceTrim(`
                Only 2nd level domains are allowed

                You provided ${getDomainLevel(domain)} level domain the "${domain}".

            `),
        );
    }

    const domainTdl = getDomainTdl(domain);

    // !!! const lock = await forLock
    await forTime(Math.random() * 10000);

    //!!! if (rdapServices === null) {
    const rdapServicesResponse = await fetch('https://data.iana.org/rdap/dns.json');
    rdapServices = (await rdapServicesResponse.json()) as any;
    // }

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

    let domainLookupResult: DomainLookupResult | 'NOT_FOUND' | null = null;

    for (const rdapServer of rdapServers) {
        try {
            // TODO: !! Queue and lock to make only one request at a time to one RDAP server

            // await forTime(Math.random() * 10000);
            const rdapDomainCheckUrl = `${rdapServer}domain/${domain}`;
            const response = await fetch(rdapDomainCheckUrl);

            if (response.status === 404) {
                domainLookupResult = 'NOT_FOUND';
            }

            domainLookupResult = (await response.json()) as DomainLookupResult;

            if (domainLookupResult.errorCode === 404) {
                domainLookupResult = 'NOT_FOUND';
            }

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
 * TODO: Maybe cache in localStorage
 */
