import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { EXPORT_OPTIONS } from '../../config';
import { ShuffleSeedContext } from '../components/Shuffle/ShuffleSeedContext';
import '../styles/globals.css';
import '../styles/reset.css';
import { ExportContext } from './ExportContext';

function App({ Component, pageProps }: AppProps) {
    return (
        <ExportContext.Provider value={EXPORT_OPTIONS}>
            <ShuffleSeedContext.Provider value={new Date().getUTCMinutes()}>
                <Component {...pageProps} />
            </ShuffleSeedContext.Provider>
        </ExportContext.Provider>
    );
}

export default appWithTranslation(App);
