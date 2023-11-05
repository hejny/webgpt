import { string_domain } from '../../../utils/typeAliases';
import { DomainStatusText } from '../DomainStatusText/DomainStatusText';
import styles from './DomainsStatusList.module.css';

interface DomainsStatusListProps {
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
export function DomainsStatusList(props: DomainsStatusListProps) {
    const { domains } = props;

    return (
        <div className={styles.DomainsStatusList}>
            {domains.map((domain) => (
                <DomainStatusText key={domain} {...{ domain }} isActionButtonShown isShownDetailedFail />
            ))}
        </div>
    );
}
