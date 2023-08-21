import { StaticAppHead } from '../components/AppHead/StaticAppHead';
import { NoSsr } from '../components/NoSsr/NoSsr';
import { AdvancedDomainsChecker } from '../components/Whois/AdvancedDomainsChecker';
import styles from '../styles/static.module.css';
import { WallpapersContext } from '../utils/hooks/WallpapersContext';

export default function DomainsPage() {
    return (
        <WallpapersContext.Provider value={{}} /* <- Does it make sence to keep this empty? */>
            <StaticAppHead subtitle={null} />

            <div className={styles.page}>
                <main>
                    <h1>AI Web Maker</h1>
                    <p>Pick your domain:</p>

                    <NoSsr>
                        <AdvancedDomainsChecker />
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
