import { removeDiacritics } from 'n12';
import { useState } from 'react';
import type { string_domain } from '../../utils/typeAliases';
import { DomainStatusChecker } from '../Domains/DomainStatusChecker/DomainStatusChecker';
import styles from './DomainsListChecker.module.css';

/**
 * Renders a domain checker with advanced options and patterns
 */
export function DomainsListChecker() {
    const [domains, setDomains] = useState<Array<string_domain>>([]);

    return (
        <div className={styles.DomainsListChecker}>
            <textarea
                className={styles.pattern}
                defaultValue={domains.join('\n')}
                onChange={(event) =>
                    setDomains(
                        event.target.value
                            .split('\n')
                            .map((name) => name.trim())
                            .map((name) => removeDiacritics(name))
                            .filter((name) => name !== ''),
                    )
                }
                placeholder={`my-cool-project.com`}
            />

            {/*/}
            <pre>{JSON.stringify({ names, tdls }, null, 4)}</pre>
            {/**/}

            {domains.map((domain) => (
                <DomainStatusChecker key={domain} {...{ domain }} isShownDetailedFail={true} isDebounced={true} isRetried={true} />
            ))}
        </div>
    );
}
