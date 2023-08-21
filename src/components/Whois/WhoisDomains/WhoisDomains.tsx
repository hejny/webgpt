import { string_domain } from '../../../utils/typeAliases';
import { WhoisDomain } from '../WhoisDomain/WhoisDomain';

import styles from './WhoisDomains.module.css';

/**
 * Renders the WhoisDomains component ⁘
 * 
 * @function
 * @param {WhoisDomainsProps} props - The properties for the WhoisDomains component.
 * @returns {JSX.Element} The rendered WhoisDomains component.
 */
interface WhoisDomainsProps {
    /**
     * The domains to check
     *
     * Note: All domains will be normalized - trimmed and lowercased
     */
    domains: Array<string_domain>;
}

/**
 * @@@
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
