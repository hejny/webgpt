import { useState } from 'react';
import { string_domain, string_tdl } from '../../utils/typeAliases';
import styles from './AdvancedDomainsChecker.module.css';
import { WhoisDomains } from './WhoisDomains/WhoisDomains';

interface AdvancedDomainsCheckerProps {}

/**
 * @@
 */
export function AdvancedDomainsChecker(props: AdvancedDomainsCheckerProps) {
    const [names, setNames] = useState<Array<string_domain>>(['my', 'cool', 'project']);
    const [tdls, setTdls] = useState<Array<string_tdl>>(['com', 'org', 'io', 'net', 'cz']);

    const domains = names.flatMap((name) => tdls.map((tdl) => `${name}.${tdl}`));

    return (
        <div className={styles.AdvancedDomainsChecker}>
            <div className={styles.patterns}>
                <textarea
                    className={styles.pattern}
                    defaultValue={names.join('\n')}
                    onChange={(event) => setNames(event.target.value.split('\n'))}
                    // placeholder={`my\ncool\nproject`}
                />
                <textarea
                    className={styles.pattern}
                    defaultValue={tdls.join('\n')}
                    onChange={(event) => setTdls(event.target.value.split('\n'))}
                    // placeholder={`com\norg\nio`}
                />
            </div>

            <WhoisDomains {...{ domains }} />
        </div>
    );
}
