import { normalizeTo_PascalCase } from 'n12';
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
            new Promise(async (resolve) => {
                const key = `whois${normalizeTo_PascalCase(domain)}`;
                const itemAsString = window.localStorage.getItem(key);

                if (itemAsString) {
                    const item = JSON.parse(itemAsString) as { nonce: number; whois: typeof WhoisSearchResult };

                    if (item.nonce === nonce) {
                        return resolve(item.whois);
                    }
                }

                const response = await fetch(`/api/whois?domain=${domain}&version=${nonce}`);
                const body = (await response.json()) as { result: typeof WhoisSearchResult };

                window.localStorage.setItem(key, JSON.stringify({ nonce, whois: body.result }));

                return resolve(body.result);
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
