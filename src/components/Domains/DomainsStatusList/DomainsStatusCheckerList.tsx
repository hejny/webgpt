import { string_domain } from '../../../utils/typeAliases';
import { DomainStatusChecker } from '../DomainStatusChecker/DomainStatusChecker';
import styles from './DomainsStatusCheckerList.module.css';

interface DomainsStatusCheckerListProps {
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
export function DomainsStatusCheckerList(props: DomainsStatusCheckerListProps) {
    const { domains } = props;

    return (
        <div className={styles.DomainsStatusCheckerList}>
            {domains.map((domain) => (
                <DomainStatusChecker key={domain} {...{ domain }} isActionButtonShown isShownDetailedFail />
            ))}
        </div>
    );
}
