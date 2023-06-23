import { useMemo, useState } from 'react';
import type WhoisSearchResult from 'whoiser' /* <- TODO: There should be probbably "import { type WhoisSearchResult } from 'whoiser' " */;
import { usePromise } from '../../../utils/hooks/usePromise';
import { getDomainStatusFromWhois } from '../utils/getDomainStatusFromWhois';
import styles from './WhoisDomain.module.css';

interface WhoisDomainProps {
    domain: string;
}

/**
 * @@
 */
export function WhoisDomain(props: WhoisDomainProps) {
    const { domain } = props;

    const [nonce, setNonce] = useState(0);
    const whoisPromise = useMemo(
        () =>
            /* not await */ fetch(`/api/whois?domain=${domain}&version=${nonce}`)
                .then((response) => response.json() as unknown as { result: typeof WhoisSearchResult })
                .then(({ result }) => result),
        [domain, nonce],
    );
    const { isComplete, value: whois } = usePromise(whoisPromise);
    const domainStatus = !isComplete ? 'PENDING' : getDomainStatusFromWhois(whois!);

    return (
        <div onClick={() => console.info(whois)}>
            {
                {
                    PENDING: <span className={styles.pending}>Getting whois about {domain}</span>,
                    AVAILABLE: <span className={styles.available}>Domain {domain} is available for registration</span>,
                    REGISTERED: <span className={styles.registered}>Domain {domain} is already registered</span>,
                    LIMIT: <span className={styles.unknown}>Exceeded limit for whois lookups</span>,
                    // TODO: TIMEOUT: <span className={styles.unknown}>Timeout in whois lookup</span>,
                    UNKNOWN: <span className={styles.unknown}>Domain status of {domain} is unknown</span>,
                }[domainStatus]
            }

            <button className={styles.refresh} onClick={() => setNonce(nonce + 1)}>
                Refresh
            </button>

            {/** <pre>{JSON.stringify(whois, null, 4)}</pre> /**/}
        </div>
    );
}
