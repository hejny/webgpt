import { string_domain } from '../../../utils/typeAliases';
import { DomainStatus } from '../DomainStatus/DomainStatus';
import styles from './DomainsStatus.module.css';

interface DomainsStatusProps {
    /**
     * The domains to check
     *
     * Note: All domains will be normalized - trimmed and lowercased
     */
    domains: Array<string_domain>;
}

/**
 * Renderrs an info about multiple domains
 * Note: It internally fetches and displays the whois
 */
export function DomainsStatus(props: DomainsStatusProps) {
    const { domains } = props;

    return (
        <div className={styles.DomainsStatus}>
            {domains.map((domain) => (
                <DomainStatus key={domain} {...{ domain }} isActionButtonShown />
            ))}
        </div>
    );
}
