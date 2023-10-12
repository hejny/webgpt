import { normalizeTo_PascalCase } from 'n12';
import { useMemo } from 'react';
import type { WhoisSearchResult } from 'whoiser';
import { WhoisHandlerResponse } from '../../pages/api/check-whois';
import { usePromise } from '../hooks/usePromise';
import { string_domain } from '../typeAliases';
import { DomainStatus } from './DomainStatus';
import { getDomainStatusFromWhois } from './getDomainStatusFromWhois';

export function useWhois(
    domain: string_domain,
    nonce?: number,
):
    | { domainStatus: 'PENDING'; whois: null }
    | {
          domainStatus: keyof typeof DomainStatus;
          whois: WhoisSearchResult;
      } {
    const normalizedWithoutForbidden = domain.trim().toLowerCase().split(' ').join('');

    if (domain !== normalizedWithoutForbidden) {
        throw new Error(`Domain "${domain}" contains forbidden characters.`);
    }

    const whoisPromise = useMemo(
        () =>
            new Promise<WhoisSearchResult>(async (resolve) => {
                const key = `whois${normalizeTo_PascalCase(domain)}`;
                const itemAsString = window.localStorage.getItem(key);

                if (itemAsString) {
                    const item = JSON.parse(itemAsString) as { nonce: number; whois: WhoisSearchResult };

                    if (item.nonce === nonce) {
                        return resolve(item.whois);
                    }
                }

                // TODO: Use here checkWhoisForBrowser instead of direct fetch
                const response = await fetch(`/api/check-whois?domain=${domain}&version=${nonce}`);
                const { whois } = (await response.json()) as WhoisHandlerResponse;

                window.localStorage.setItem(key, JSON.stringify({ nonce, whois }));

                return resolve(whois);
            }),
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
