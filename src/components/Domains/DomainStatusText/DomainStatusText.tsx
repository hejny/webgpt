import Link from 'next/link';
import { classNames } from '../../../utils/classNames';
import type { DomainStatus } from '../../../utils/domains/DomainStatus';
import { getDomainTdl } from '../../../utils/domains/getDomainTdl';
import type { string_css_class, string_domain } from '../../../utils/typeAliases';
import styles from './DomainStatusText.module.css';

export interface DomainStatusTextProps {
    /**
     * The domain which is checked
     *
     * Note: The domain should be normalized - trimmed and lowercased
     */
    domain: string_domain;

    /**
     * Status of the domain
     */
    domainStatus: keyof typeof DomainStatus | 'PENDING';

    /**
     * How much attempts to check were done?
     */
    attemptCount: number;

    /**
     * TODO:
     * When was the domain checked?
     *
    checkedAt: Date;
    */

    /**
     * Is button to open page shown?
     */
    isActionButtonShown?: boolean;

    /**
     * Is shown that the domain exceeded limit, timeout or not supported tdl for whois lookups?
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
    const { domain, isActionButtonShown, isShownDetailedFail, attemptCount, className } = props;
    let { domainStatus } = props;

    if (['LIMIT', 'TIMEOUT', 'NOT_SUPPORTED'].includes(domainStatus as any) && !isShownDetailedFail) {
        domainStatus = 'UNKNOWN';
    }

    const attemptCountMessage = attemptCount > 1 ? <i>(Tried {attemptCount}x)</i> : <></>;

    return (
        <div
            // onClick={() => console.info(whois)}
            className={classNames(styles.DomainStatusText, className)}
        >
            {
                {
                    PENDING: (
                        <span className={styles.pending}>
                            <b>{domain}</b>: Getting info about domain ⏣ {/* <- TODO: Circle between ⌬ and ⏣ */}
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
                            <b>{domain}</b> exceeded limit for whois lookups {attemptCountMessage}
                        </span>
                    ),
                    TIMEOUT: (
                        <span className={styles.timeout}>
                            <b>{domain}</b> timeouted while getting whois info {attemptCountMessage}
                        </span>
                    ),
                    UNKNOWN: (
                        <span className={styles.unknown}>
                            <b>{domain}</b> status is unknown {attemptCountMessage}
                        </span>
                    ),
                    TDL_NOT_SUPPORTED: (
                        <span className={styles.unknown}>
                            <b>{domain}</b> unfortunately we can not check .{getDomainTdl(domain)} domains
                        </span>
                    ),
                }[domainStatus]
            }

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
