import { useState } from 'react';
import { WhoisDomain } from './WhoisDomain/WhoisDomain';
import styles from './WhoisDomains.module.css';

interface WhoisDomainsProps {}

/**
 * @@
 */
export function WhoisDomains(props: WhoisDomainsProps) {
    const [names, setNames] = useState<Array<string>>(['my', 'cool', 'project']);
    const [tdls, setTdls] = useState<Array<string>>(['com', 'org', 'io', 'net', 'cz']);

    const domains = names.flatMap((name) => tdls.map((tdl) => `${name}.${tdl}`));

    return (
        <div className={styles.WhoisDomains}>
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

            {domains.map((domain) => (
                <WhoisDomain key={domain} {...{ domain }} />
            ))}
        </div>
    );
}
