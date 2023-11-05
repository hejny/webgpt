import Link from 'next/link';
import { useMemo, useState } from 'react';
import { classNames } from '../../../utils/classNames';
import { checkDomain } from '../../../utils/domains/checkDomain';
import { usePromise } from '../../../utils/hooks/usePromise';
import { justNoActionWith } from '../../../utils/justNoActionWith';
import { string_css_class, string_domain } from '../../../utils/typeAliases';
import styles from './DomainStatusText.module.css';

interface DomainStatusTextProps {
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
     * Is shown that the domain exceeded limit or timeout for whois lookups?
     * If no or not set, it will be shown as UNKNOWN
     */
    isShownDetailedFail?: boolean;

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
export function DomainStatusText(props: DomainStatusTextProps) {
    const { domain, isActionButtonShown, isShownDetailedFail, className } = props;

    const [nonce, setNonce] = useState(0);
    const domainStatusPromise = useMemo(() => {
        justNoActionWith(nonce);
        return /* not await */ checkDomain(domain);
    }, [domain, nonce]);
    let { value: domainStatus } = usePromise(domainStatusPromise, [domain]);

    if (['LIMIT', 'TIMEOUT'].includes(domainStatus as any) && !isShownDetailedFail) {
        domainStatus = 'UNKNOWN';
    }

    return (
        <div
            // onClick={() => console.info(whois)}
            className={classNames(styles.DomainStatusText, className)}
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
                    TIMEOUT: (
                        <span className={styles.timeout}>
                            <b>{domain}</b> timeouted while getting whois info
                        </span>
                    ),
                    UNKNOWN: (
                        <span className={styles.unknown}>
                            <b>{domain}</b> status is unknown
                        </span>
                    ),
                }[domainStatus || 'PENDING']
            }

            {nonce}

            {['UNKNOWN', 'LIMIT'].includes(domainStatus as any) && (
                <button style={{ cursor: 'pointer' }} className={styles.action} onClick={() => setNonce(nonce + 1)}>
                    Refresh
                </button>
            )}

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

/**
 * TODO: !! Probbably debounce the whois lookup
 */
