import { StaticAppHead } from '../components/AppHead/StaticAppHead';
import { OnlyReadyRouter } from '../components/NoSsr/OnlyReadyRouter';
import { WebsiteTablo } from '../components/WebsiteTablo/WebsiteTablo';
import styles from '../styles/static.module.css' /* <- TODO: [🤶] Get rid of page css and only use components (as <StaticLayout/>) */;

export default function WebsiteTabloPage() {
    return (
        <>
            <StaticAppHead subtitle={null} />

            <div className={styles.page}>
                <main>
                    <h1
                        style={{
                            display:
                                'none' /* <- TODO: For SEO/Social is it better to have invisible <h1> or just <title> + meta tags */,
                        }}
                    >
                        WebGPT
                    </h1>
                    <OnlyReadyRouter>
                        <WebsiteTablo />
                    </OnlyReadyRouter>
                </main>
            </div>
        </>
    );
}
