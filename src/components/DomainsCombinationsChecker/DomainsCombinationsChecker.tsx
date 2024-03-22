import { useState } from 'react';
import spaceTrim from 'spacetrim';
import type { string_domain, string_domain_tdl } from '../../utils/typeAliases';
import { DomainStatusChecker } from '../Domains/DomainStatusChecker/DomainStatusChecker';
import { createAllPermutationsOf } from '../Domains/utils/createAllPermutationsOf';
import { createAllSubsetsOf } from '../Domains/utils/createAllSubsetsOf';
import styles from './DomainsCombinationsChecker.module.css';

/**
 * Renders a domain checker with advanced options and patterns
 */
export function DomainsCombinationsChecker() {
    const [names, setNames] = useState<Array<string_domain>>(['web', 'gpt']);
    const [tdls, setTdls] = useState<Array<string_domain_tdl>>(['com', /*'org', 'io', 'net',*/ 'cz']);

    const namePartsCombinations = createAllSubsetsOf(...names);
    const namePartsPermutations = namePartsCombinations.flatMap((subset) => createAllPermutationsOf(...subset));
    const nameCombinations = namePartsPermutations.flatMap((subset) =>
        subset.length === 0 ? [] : [subset.join('') /*, subset.join('-')*/],
    );

    const domains = nameCombinations
        .flatMap((name) => tdls.map((tdl) => `${name}.${tdl}`))
        .map((domain) => domain.trim().toLowerCase().split(' ').join('-'));
    const uniqueDomains = [...new Set(domains)];
    const sortedDomains = uniqueDomains.sort((a, b) => a.length - b.length);

    return (
        <div className={styles.DomainsCombinationsChecker}>
            <div className={styles.patterns}>
                <textarea
                    className={styles.pattern}
                    defaultValue={names.join('\n')}
                    onChange={(event) =>
                        setNames(event.target.value.split('\n').filter((name) => spaceTrim(name) !== ''))
                    }
                    // placeholder={`my\ncool\nproject`}
                />
                <textarea
                    className={styles.pattern}
                    defaultValue={tdls.join('\n')}
                    onChange={(event) =>
                        setTdls(event.target.value.split('\n').filter((name) => spaceTrim(name) !== ''))
                    }
                    // placeholder={`com\norg\nio`}
                />
            </div>

            {/*/}
            <pre>{JSON.stringify({ names, tdls }, null, 4)}</pre>
            {/**/}

            {sortedDomains.map((domain) => (
                <DomainStatusChecker
                    key={domain}
                    {...{ domain }}
                    isActionButtonShown={true}
                    isShownDetailedFail={true}
                    isDebounced={true}
                    isRetried={false}
                />
            ))}
        </div>
    );
}

/**
 * TODO: Do all permutations
 * TODO: Special reverse-regex format to combinate
 */
