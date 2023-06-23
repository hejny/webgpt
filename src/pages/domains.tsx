import { Barlow_Condensed } from '@next/font/google';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useMemo, useState } from 'react';
import type WhoisSearchResult from 'whoiser';
import { StaticAppHead } from '../components/AppHead/StaticAppHead';
import styles from '../styles/static.module.css';
import { classNames } from '../utils/classNames';
import { getDomainStatusFromWhois } from '../utils/getDomainStatusFromWhois';
import { usePromise } from '../utils/hooks/usePromise';
import { WallpapersContext } from '../utils/hooks/WallpapersContext';
import { string_hostname } from '../utils/typeAliases';

const font = Barlow_Condensed({ weight: '400', style: 'normal', subsets: ['latin', 'latin-ext'] });

export default function DomainsPage() {
    const [domain, setDomain] = useState<string_hostname>('');
    const whoisPromise = useMemo(
        () =>
            /* not await */ fetch(`/api/whois?domain=${domain}`).then(
                (response) => response.json() as unknown as typeof WhoisSearchResult,
            ),
        [domain],
    );
    const { value: whois } = usePromise(whoisPromise);
    const domainStatus = !whois ? 'PENDING' : getDomainStatusFromWhois(whois);

    return (
        <WallpapersContext.Provider value={{}} /* <- Does it make sence to keep this empty? */>
            <StaticAppHead subtitle={null} />

            <div className={classNames(styles.page, font.className)}>
                <main>
                    <h1>AI Web Maker</h1>
                    <p>Pick your domain:</p>

                    <input
                        defaultValue={domain}
                        onChange={(event) => setDomain(event.target.value)}
                        placeholder="example.com"
                    />

                    {
                        {
                            PENDING: <span style={{ color: '#888888' }}>Getting whois information</span>,
                            AVAILABLE: <span style={{ color: '#0bee57' }}>Domain is available for registration</span>,
                            REGISTERED: <span style={{ color: '#dd1b1b' }}>Domain is already registered</span>,
                            UNKNOWN: <span style={{ color: '#888888' }}>Domain status is unknown</span>,
                        }[domainStatus]
                    }

                    {/**/ <pre>{JSON.stringify(whois, null, 4)}</pre> /**/}
                </main>

                {/* TODO: Make here some footer OR keep it as iframe
                <footer>
                    <FooterSection />
                </footer>
                */}
            </div>
        </WallpapersContext.Provider>
    );
}

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

/**
 * TODO: !!! This should be in /embed/gallery and index should be generated from this and create more indexes
 * TODO: !! [🧶] FAQ section - how it works
 * TODO: !! [1] Filters - [Fulltext][Light/Dark/Color]
 * TODO: !! [1] Order - [Relevance][DateGenerated][Random][Lightness][Color] / [ASC][DESC]
 * TODO: !! [1] Limit
 * TODO: !! [1] Pagination
 * TODO: !! Preview page on hover on each item
 * TODO: [🪒] Can be getStaticProps shared between all pages?
 * TODO: [🪒] Can be fonts shared between all pages?
 * TODO: Write better about how are images created
 *       TODO: Connect with section/article about AI generative technology
 * TODO: [🧈] Best way how to share page css
 * TODO: [🔗] ACRY should we use <a ...>...</a> OR <Link ...>...</Link> for external links in Next App
 */
