import { useMemo } from 'react';
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

    const whoisPromise = useMemo(
        () =>
            /* not await */ fetch(`/api/whois?domain=${domain}`).then(
                (response) => response.json() as unknown as typeof WhoisSearchResult,
            ),
        [domain],
    );
    const { value: whois } = usePromise(whoisPromise);
    const domainStatus = !whois ? 'PENDING' : getDomainStatusFromWhois(whois);

    return (
        <>
            {
                {
                    PENDING: <span className={styles.pending}>Getting whois about {domain}</span>,
                    AVAILABLE: <span className={styles.available}>Domain {domain} is available for registration</span>,
                    REGISTERED: <span className={styles.registered}>Domain {domain} is already registered</span>,
                    UNKNOWN: <span className={styles.unknown}>Domain status of {domain} is unknown</span>,
                }[domainStatus]
            }

            {/**/ <pre>{JSON.stringify(whois, null, 4)}</pre> /**/}
        </>
    );
}
