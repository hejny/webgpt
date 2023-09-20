import { useState } from 'react';
import type { string_hostname } from '../../utils/typeAliases';
import { WhoisDomain } from './WhoisDomain/WhoisDomain';

/**
 * Renders a simple domain checker with a single input and single output
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
