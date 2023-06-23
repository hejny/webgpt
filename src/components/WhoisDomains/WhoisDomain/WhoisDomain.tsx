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
        <div className={styles.WhoisDomain}>
            {
                {
                    PENDING: <span style={{ color: '#888888' }}>Getting whois information</span>,
                    AVAILABLE: <span style={{ color: '#0bee57' }}>Domain is available for registration</span>,
                    REGISTERED: <span style={{ color: '#dd1b1b' }}>Domain is already registered</span>,
                    UNKNOWN: <span style={{ color: '#888888' }}>Domain status is unknown</span>,
                }[domainStatus]
            }

            {/**/ <pre>{JSON.stringify(whois, null, 4)}</pre> /**/}
        </div>
    );
}
