import { string_domain } from '../../../utils/typeAliases';
import { WhoisDomain } from '../WhoisDomain/WhoisDomain';

import styles from './WhoisDomains.module.css';

interface WhoisDomainsProps {
    domains: Array<string_domain>;
}

/**
 * @@
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
