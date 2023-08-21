import { useState } from 'react';
import { string_hostname } from '../../utils/typeAliases';
import { WhoisDomain } from './WhoisDomain/WhoisDomain';

/**
 * Interface representing the props for the WhoisDomains component ⁘
 */
interface WhoisDomainsProps {}

/**
 * Function component that renders a SimpleDomainChecker ⁘
 * 
 * 
 * @param {WhoisDomainsProps} props - The props for the SimpleDomainChecker component.
 * @returns {JSX.Element} The rendered SimpleDomainChecker component.
 */
export function SimpleDomainChecker(props: WhoisDomainsProps) {
    const [domain, setDomain] = useState<string_hostname>('');

    return (
        <div /*className={styles.WhoisDomains}*/>
            <input
                defaultValue={domain}
                onChange={(event) => setDomain(event.target.value)}
                placeholder="example.com"
            />
            <WhoisDomain {...{ domain }} />
        </div>
    );
}
