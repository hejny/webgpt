import Link from 'next/link';
import { useState } from 'react';
import { string_domain } from '../../../utils/typeAliases';
import { useWhois } from '../utils/useWhois';
import styles from './WhoisDomain.module.css';

interface WhoisDomainProps {
    domain: string_domain;
}

/**
 * @@
 */
export function WhoisDomain(props: WhoisDomainProps) {
    let { domain } = props;

    domain = domain.trim().toLowerCase().split(' ').join('-');

    const [nonce, setNonce] = useState(0);
    const { domainStatus, whois } = useWhois(domain, nonce);

    return (
        <div onClick={() => console.info(whois)}>
            {
                {
                    PENDING: (
                        <span className={styles.pending}>
                            Getting whois about <b>{domain}</b>
                        </span>
                    ),
                    AVAILABLE: (
                        <span className={styles.available}>
                            Domain <b>{domain}</b> is available for registration
                        </span>
                    ),
                    REGISTERED: (
                        <span className={styles.registered}>
                            Domain <b>{domain}</b> is already registered
                        </span>
                    ),
                    LIMIT: <span className={styles.unknown}>Exceeded limit for whois lookups</span>,
                    // TODO: TIMEOUT: <span className={styles.unknown}>Timeout in whois lookup</span>,
                    UNKNOWN: (
                        <span className={styles.unknown}>
                            Domain status of <b>{domain}</b> is unknown
                        </span>
                    ),
                }[domainStatus]
            }

            <button style={{ cursor: 'pointer' }} className={styles.action} onClick={() => setNonce(nonce + 1)}>
                Refresh
            </button>

            {domainStatus === 'AVAILABLE' && (
                <Link
                    className={styles.action}
                    href={
                        `https://subreg.cz/cz/domeny/registrace-domeny/?domain=${encodeURIComponent(
                            domain,
                        )}` /* <- TODO: More registrators */
                    }
                >
                    Register
                </Link>
            )}

            {domainStatus === 'REGISTERED' && (
                <Link className={styles.action} href={`https://${domain}`}>
                    Open
                </Link>
            )}

            {/** <pre>{JSON.stringify(whois, null, 4)}</pre> /**/}
        </div>
    );
}
