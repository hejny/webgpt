import { StaticAppHead } from '../components/AppHead/StaticAppHead';
import { PublishLoading } from '../components/PublishModal/PublishLoading';
import styles from '../styles/static.module.css' /* <- TODO: [🤶] Get rid of page css and only use components (as <StaticLayout/>) */;

export default function PublishLoadingPage() {
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
                        1-2i {/* <- TODO: !!!! ACRY Change "AI Web" and 1-2i */}
                    </h1>
                    <PublishLoading />
                </main>
            </div>
        </>
    );
}
