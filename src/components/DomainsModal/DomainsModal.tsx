import { useEffect, useState } from 'react';
import { forTime } from 'waitasecond';
import { checkDomain } from '../../utils/domains/checkDomain';
import { useCurrentWallpaper } from '../../utils/hooks/useCurrentWallpaper';
import { DomainStatusText, DomainStatusTextProps } from '../Domains/DomainStatusText/DomainStatusText';
import { Modal } from '../Modal/00-Modal';

/**
 * Renders the modal with a domain suggestions for the current wallpaper
 */
export function DomainsModal() {
    const [wallpaper] = useCurrentWallpaper();

    const [domains, setDomains] = useState<Array<Pick<DomainStatusTextProps, 'domain' | 'domainStatus'>>>([]);

    useEffect(() => {
        let isDestroyed = false;

        (async () => {
            while (true) {
                await forTime(1000);

                if (isDestroyed) {
                    return;
                }

                const domain = 'towns.cz';

                const domainsCheck: Pick<DomainStatusTextProps, 'domain' | 'domainStatus'> = {
                    domain,
                    domainStatus: 'PENDING',
                };

                setDomains((domains) => [...domains, domainsCheck]);

                domainsCheck.domainStatus = await checkDomain(domain);

                setDomains((domains) => [...domains.filter((_) => _.domain === domain), domainsCheck]);
            }
        })();

        return () => {
            isDestroyed = true;
        };
    }, []);

    return (
        <Modal title={'Domains'} isCloseable>
            <ul>
                {wallpaper.keywords?.map((keyword) => (
                    <li key={keyword}>{keyword}</li>
                ))}
            </ul>
            {domains.map(({ domain, domainStatus }) => (
                <DomainStatusText key={domain} {...{ domain, domainStatus }} isActionButtonShown isShownDetailedFail />
            ))}
        </Modal>
    );
}
