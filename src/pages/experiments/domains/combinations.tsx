import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { StaticAppHead } from '../../../components/AppHead/StaticAppHead';
import { DomainsCombinationsChecker } from '../../../components/DomainsCombinationsChecker/DomainsCombinationsChecker';
import { NoSsr } from '../../../components/NoSsr/NoSsr';
import styles from '../../../styles/static.module.css' /* <- TODO: [🤶] Get rid of page css and only use components (as <StaticLayout/>) */;
import { WallpapersContext } from '../../../utils/hooks/WallpapersContext';

export default function DomainsCombinationsPage() {
    return (
        <WallpapersContext.Provider value={{}} /* <- Does it make sence to keep this empty? */>
            <StaticAppHead subtitle={null} />

            <div className={styles.page}>
                <main>
                    <h1>WebGPT</h1>
                    <p>Pick your domain:</p>

                    <NoSsr>
                        <DomainsCombinationsChecker />
                    </NoSsr>
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
