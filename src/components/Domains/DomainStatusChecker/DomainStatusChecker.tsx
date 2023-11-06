import { useEffect, useState } from 'react';
import { forTime } from 'waitasecond';
import { checkDomain } from '../../../utils/domains/checkDomain';
import { DomainStatus } from '../../../utils/domains/DomainStatus';

import { justNoActionWith } from '../../../utils/justNoActionWith';
import type { DomainStatusTextProps } from '../DomainStatusText/DomainStatusText';
import { DomainStatusText } from '../DomainStatusText/DomainStatusText';
import styles from '../DomainStatusText/DomainStatusText.module.css';

interface DomainStatusCheckerProps extends Omit<DomainStatusTextProps, 'domainStatus' | 'tryCount' | 'checkedAt'> {
    /**
     * Is checking immediately after the component is mounted OR after some debounce time
     */
    isDebounced: boolean;

    /**
     * Is auto refreshed after some time when the domain is UNKNOWN, LIMIT or TIMEOUT
     */
    isRetried: boolean;
}

/**
 * Renderrs an info about a domain
 *
 * Note: It internally fetches and displays the whois
 */
export function DomainStatusChecker(props: DomainStatusCheckerProps) {
    const { domain, isActionButtonShown, isShownDetailedFail, isDebounced, isRetried, className } = props;

    const [domainStatus, setDomainStatus] = useState<keyof typeof DomainStatus | 'PENDING'>('PENDING');
    const [checkedAt, setCheckedAt] = useState<Date | null>(null);
    const [tryCount, setTryCount] = useState(1);
    const domainStatusPromise = useEffect(() => {
        let isDestroyed = false;

        (async () => {
            if (isDebounced) {
                await forTime(200 /* <- TODO: !! DEBOUNCE_TIME_MS to config */);
            }
            if (isDestroyed) {
                return;
            }
            justNoActionWith(tryCount);
            const domainStatus = await checkDomain(domain);

            if (['LIMIT', 'TIMEOUT', 'UNKNOWN'].includes(domainStatus)) {
                await forTime(3000 /* <- TODO: !! RETRY_TIME_MS to config */);
                setTryCount(tryCount + 1);
            }

            setCheckedAt(new Date());
            setDomainStatus(domainStatus);
        })();

        return () => {
            isDestroyed = true;
        };
    }, [domain, isDebounced, isRetried, tryCount]);

    let domainStatusShown = domainStatus;

    if (
        ['LIMIT', 'TIMEOUT', 'NOT_SUPPORTED'].includes(domainStatusShown as keyof typeof DomainStatus | 'PENDING') &&
        !isShownDetailedFail
    ) {
        domainStatusShown = 'UNKNOWN';
    }

    return (
        <>
            <DomainStatusText
                {...{ domain, isActionButtonShown, isShownDetailedFail, className, tryCount, checkedAt }}
                domainStatus={domainStatusShown}
            />
            {isActionButtonShown && ['UNKNOWN', 'LIMIT'].includes(domainStatusShown as any) && (
                <button
                    style={{ cursor: 'pointer' }}
                    className={styles.action}
                    onClick={() => setTryCount(tryCount + 1)}
                >
                    Refresh
                </button>
            )}
        </>
    );
}

/**
 * TODO: !! Probbably debounce the whois lookup
 */
