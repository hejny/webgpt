import { useMemo } from 'react';
import type WhoisSearchResult from 'whoiser' /* <- TODO: There should be probbably "import { type WhoisSearchResult } from 'whoiser' " */;
import { usePromise } from '../../../utils/hooks/usePromise';
import { string_domain } from '../../../utils/typeAliases';
import { DomainStatus } from './DomainStatus';
import { getDomainStatusFromWhois } from './getDomainStatusFromWhois';

export function useWhois(
    domain: string_domain,
    nonce?: number,
):
    | { domainStatus: 'PENDING'; whois: null }
    | {
          domainStatus: keyof typeof DomainStatus;
          whois: typeof WhoisSearchResult;
      } {
    const normalizedWithoutForbidden = domain.trim().toLowerCase().split(' ').join('');

    if (domain !== normalizedWithoutForbidden) {
        throw new Error(`Domain "${domain}" contains forbidden characters.`);
    }

    const whoisPromise = useMemo(
        () =>
            /* not await */ fetch(`/api/whois?domain=${domain}&version=${nonce}`)
                .then((response) => response.json() as unknown as { result: typeof WhoisSearchResult })
                .then(({ result }) => result),
        [domain, nonce],
    );
    const { value: whois } = usePromise(whoisPromise);

    if (!whois) {
        return { domainStatus: 'PENDING', whois: null };
    } else {
        const domainStatus = getDomainStatusFromWhois(whois);
        return { domainStatus, whois };
    }
}
