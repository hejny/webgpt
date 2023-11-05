import { useState } from 'react';
import { string_hostname } from '../../utils/typeAliases';
import { DomainStatusChecker } from './DomainStatusChecker/DomainStatusChecker';
import { DomainStatusText } from './DomainStatusText/DomainStatusText';

/**
 * Renders a simple domain checker with a single input and single output
 */
export function SimpleDomainChecker() {
    const [domain, setDomain] = useState<string_hostname>('');

    return (
        <div /*className={styles.DomainsStatus}*/>
            <input
                defaultValue={domain}
                onChange={(event) => setDomain(event.target.value)}
                placeholder="example.com"
            />
            <DomainStatusChecker {...{ domain }} isActionButtonShown isShownDetailedFail />
        </div>
    );
}
