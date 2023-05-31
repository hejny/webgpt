import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { createContext } from 'react';
import { EXPORT_OPTIONS } from '../../config';
import { AnalyticsAndIntegrations } from '../components/AnalyticsAndIntegrations/AnalyticsAndIntegrations';
import { ShuffleSeedContext } from '../components/Shuffle/Shuffle';
import '../styles/globals.css';
import '../styles/reset.css';

export const ExportContext = createContext<typeof EXPORT_OPTIONS>(EXPORT_OPTIONS);

function App({ Component, pageProps }: AppProps) {
    return (
        <ExportContext.Provider value={EXPORT_OPTIONS}>
            <ShuffleSeedContext.Provider value={new Date().getUTCMinutes()}>
                <AnalyticsAndIntegrations />
                <Component {...pageProps} />
            </ShuffleSeedContext.Provider>
        </ExportContext.Provider>
    );
}

export default appWithTranslation(App);
