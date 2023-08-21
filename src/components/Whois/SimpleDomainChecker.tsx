import { useState } from 'react';
import { string_hostname } from '../../utils/typeAliases';
import { WhoisDomain } from './WhoisDomain/WhoisDomain';

/**
 * Simple domain checker with a single input and single output
 */
export function SimpleDomainChecker() {
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
