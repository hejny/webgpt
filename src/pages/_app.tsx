import { Oswald } from '@next/font/google';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { createContext } from 'react';
import { EXPORT_OPTIONS } from '../../config';
import { ShuffleSeedContext } from '../components/Shuffle/Shuffle';
import '../styles/globals.css';
import '../styles/reset.css';

// TODO: !!! Do not use hardcoded fonts
const oswaltFont = Oswald({ weight: '400', style: 'normal', subsets: ['latin', 'latin-ext'] });
export const ExportContext = createContext<typeof EXPORT_OPTIONS>(EXPORT_OPTIONS);

function App({ Component, pageProps }: AppProps) {
    return (
        <ExportContext.Provider value={EXPORT_OPTIONS}>
            <ShuffleSeedContext.Provider value={new Date().getUTCMinutes()}>
                <style jsx global>{`
                    html {
                        font-family: ${oswaltFont.style.fontFamily}, sans-serif;
                    }
                `}</style>
                <Component {...pageProps} />
            </ShuffleSeedContext.Provider>
        </ExportContext.Provider>
    );
}

export default appWithTranslation(App);
