import Link from 'next/link';
import { useMemo } from 'react';
import { classNames } from '../../../utils/classNames';
import { checkDomain } from '../../../utils/domains/checkDomain';
import { usePromise } from '../../../utils/hooks/usePromise';
import { string_css_class, string_domain } from '../../../utils/typeAliases';
import styles from './DomainStatus.module.css';

interface DomainStatusProps {
    /**
     * The domain to check
     *
     * Note: The domain will be normalized - trimmed and lowercased
     */
    domain: string_domain;

    /**
     * Is button to open page shown?
     */
    isActionButtonShown?: boolean;

    /**
     * Optional CSS class name which will be added to root element
     */
    className?: string_css_class;
}

/**
 * Renderrs an info about a domain
 *
 * Note: It internally fetches and displays the whois
 */
export function DomainStatus(props: DomainStatusProps) {
    const { domain, isActionButtonShown, className } = props;

    // TODO: !!! Debounce

    const domainStatusPromise = useMemo(() => /* not await */ checkDomain(domain), [domain]);
    const { value: domainStatus } = usePromise(domainStatusPromise, [domain]);

    return (
        <div
            // onClick={() => console.info(whois)}
            className={classNames(styles.whois, className)}
        >
            {
                {
                    PENDING: (
                        <span className={styles.pending}>
                            <b>{domain}</b>: Getting whois info...
                        </span>
                    ),
                    AVAILABLE: (
                        <span className={styles.available}>
                            <b>{domain}</b> is available for registration
                        </span>
                    ),
                    REGISTERED: (
                        <span className={styles.registered}>
                            <b>{domain}</b> is already registered
                        </span>
                    ),
                    LIMIT: (
                        <span className={styles.unknown}>
                            <b>{domain}</b> exceeded limit for whois lookups
                        </span>
                    ),
                    // TODO: TIMEOUT: <span className={styles.unknown}>Timeout in whois lookup</span>,
                    UNKNOWN: (
                        <span className={styles.unknown}>
                            <b>{domain}</b> status is unknown
                        </span>
                    ),
                }[domainStatus || 'PENDING']
            }

            {/* TODO: [🧠] How to refresh the domain information?
            <button style={{ cursor: 'pointer' }} className={styles.action} onClick={() => setNonce(nonce + 1)}>
                Refresh
            </button>
            */}

            {/* TODO: [🧠] How/where to offer domain registration?
            {domainStatus === 'AVAILABLE' && (
                <Link
                    className={styles.action}
                    href={
                        `https://subreg.cz/cz/domeny/registrace-domeny/?domain=${encodeURIComponent(
                            domain,
                        )}` /* <- TODO: More registrators * /
                    }
                >
                    Register
                </Link>
            )}
            */}

            {isActionButtonShown && domainStatus === 'REGISTERED' && (
                <Link className={styles.action} href={`https://${domain}`} target="_blank" rel="noopener noreferrer">
                    Open
                </Link>
            )}

            {/** <pre>{JSON.stringify(whois, null, 4)}</pre> /**/}
        </div>
    );
}
