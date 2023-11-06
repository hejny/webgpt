import { useMemo, useState } from 'react';
import { checkDomain } from '../../../utils/domains/checkDomain';
import { DomainStatus } from '../../../utils/domains/DomainStatus';
import { usePromise } from '../../../utils/hooks/usePromise';


import { forTime } from 'waitasecond';

import { justNoActionWith } from '../../../utils/justNoActionWith';
import type { DomainStatusTextProps } from '../DomainStatusText/DomainStatusText';
import { DomainStatusText } from '../DomainStatusText/DomainStatusText';
import styles from '../DomainStatusText/DomainStatusText.module.css';

/**
 * Renderrs an info about a domain
 *
 * Note: It internally fetches and displays the whois
 */
export function DomainStatusChecker(props: Omit<DomainStatusTextProps, 'domainStatus'>) {
    const { domain, isActionButtonShown, isShownDetailedFail, className } = props;

    const [nonce, setNonce] = useState(0);
    const domainStatusPromise = useMemo<Promise<keyof typeof DomainStatus>>(async () => {

await forTime(Math.random()*5000);
        justNoActionWith(nonce);
        return /* not await */ checkDomain(domain);
    }, [domain, nonce]);
    let { value: domainStatus } = usePromise<keyof typeof DomainStatus>(domainStatusPromise, [domain]);

    if (['LIMIT', 'TIMEOUT', 'NOT_SUPPORTED'].includes(domainStatus as any) && !isShownDetailedFail) {
        domainStatus = 'UNKNOWN';
    }

    return (
        <>
            <DomainStatusText
                {...{ domain, isActionButtonShown, isShownDetailedFail, className }}
                domainStatus={domainStatus || 'PENDING'}
            />
            {['UNKNOWN', 'LIMIT'].includes(domainStatus as any) && (
                <button style={{ cursor: 'pointer' }} className={styles.action} onClick={() => setNonce(nonce + 1)}>
                    Refresh
                </button>
            )}
        </>
    );
}

/**
 * TODO: !! Probbably debounce the whois lookup
 */
