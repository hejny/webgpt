import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import webgptLogo from '../../../../public/logo/webgpt.white.svg';
import { StaticAppHead } from '../../../components/AppHead/StaticAppHead';
import { SimpleDomainChecker } from '../../../components/Domains/SimpleDomainChecker';
import { NoSsr } from '../../../components/NoSsr/NoSsr';
import styles from '../../../styles/static.module.css' /* <- TODO: [🤶] Get rid of page css and only use components (as <StaticLayout/>) */;
import { WallpapersContext } from '../../../utils/hooks/WallpapersContext';

export default function DomainPage() {
    return (
        <WallpapersContext.Provider value={{}} /* <- Does it make sence to keep this empty? */>
            <StaticAppHead subtitle={null} />

            <div className={styles.page}>
                <main>
                    <h1>
                        <Image alt="WebGPT logo" src={webgptLogo} />
                    </h1>
                    <p>Pick your domain:</p>

                    <NoSsr>
                        <SimpleDomainChecker />
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
