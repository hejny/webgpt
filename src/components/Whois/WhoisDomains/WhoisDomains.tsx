import type { string_domain } from '../../../utils/typeAliases';
import { WhoisDomain } from '../WhoisDomain/WhoisDomain';
import styles from './WhoisDomains.module.css';

interface WhoisDomainsProps {
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
export function WhoisDomains(props: WhoisDomainsProps) {
    const { domains } = props;

    return (
        <div className={styles.WhoisDomains}>
            {domains.map((domain) => (
                <WhoisDomain key={domain} {...{ domain }} />
            ))}
        </div>
    );
}
