import type { domain } from 'node-rdap';

/**
 * Custom type for the result of a WHOIS lookup
 */
export type DomainLookupResult = NonNullable<Awaited<ReturnType<typeof domain>>>;
