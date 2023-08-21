import { useState } from 'react';
import spaceTrim from 'spacetrim';
import { string_domain, string_tdl } from '../../utils/typeAliases';
import styles from './AdvancedDomainsChecker.module.css';
import { createAllPermutationsOf } from './utils/createAllPermutationsOf';
import { createAllSubsetsOf } from './utils/createAllSubsetsOf';
import { WhoisDomains } from './WhoisDomains/WhoisDomains';

/**
 * Represents the Advanced Domain Checker component ⁘
 * 
 * 
 * @returns {JSX.Element}
 */
export function AdvancedDomainsChecker() {
    const [names, setNames] = useState<Array<string_domain>>(['ai', 'project']);
    const [tdls, setTdls] = useState<Array<string_tdl>>(['com', /*'org', 'io', 'net',*/ 'cz']);

/**
 * Represents an array of all subsets of name parts ⁘
 * 
 * 
 * @type {Array<Array<string_domain>>}
 */
    const namePartsCombinations = createAllSubsetsOf(...names);
/**
 * Represents an array of all permutations of name parts ⁘
 * 
 * 
 * @type {Array<Array<string_domain>>}
 */
    const namePartsPermutations = namePartsCombinations.flatMap((subset) => createAllPermutationsOf(...subset));

/**
 * Represents an array of name combinations ⁘
 * 
 * 
 * @type {Array<string>}
 */
    const nameCombinations = namePartsPermutations.flatMap((subset) =>
        subset.length === 0 ? [] : [subset.join('') /*, subset.join('-')*/],
    );

/**
 * Represents an array of all domain names ⁘
 * 
 * 
 * @type {Array<string>}
 */
    const domains = nameCombinations.flatMap((name) => tdls.map((tdl) => `${name}.${tdl}`));
/**
 * Represents an array of unique domain names ⁘
 * 
 * 
 * @type {Array<string>}
 */
    const uniqueDomains = [...new Set(domains)];
/**
 * Represents an array of sorted domain names ⁘
 * 
 * 
 * @type {Array<string>}
 */
    const sortedDomains = uniqueDomains.sort((a, b) => a.length - b.length);

    return (
        <div className={styles.AdvancedDomainsChecker}>
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

            <WhoisDomains domains={sortedDomains} />
        </div>
    );
}

/**
 * TODO: Do all permutations
 * TODO: Special reverse-regex format to combinate
 */
