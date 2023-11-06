import { useState } from 'react';
import spaceTrim from 'spacetrim';
import type { string_domain } from '../../utils/typeAliases';
import { DomainsStatusCheckerList } from '../Domains/DomainsStatusList/DomainsStatusCheckerList';
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
                    setDomains(event.target.value.split('\n').filter((name) => spaceTrim(name) !== ''))
                }
                placeholder={`my-cool-project.com`}
            />

            {/*/}
            <pre>{JSON.stringify({ names, tdls }, null, 4)}</pre>
            {/**/}

            <DomainsStatusCheckerList {...{ domains }} />
        </div>
    );
}
