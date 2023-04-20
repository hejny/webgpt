import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { createContext } from 'react';
import { DEBUG } from '../../config';
import { ShuffleSeedContext } from '../components/Shuffle/Shuffle';
import '../styles/config.css';
import '../styles/globals.css';
import '../styles/reset.css';

export const DebugContext = createContext<typeof DEBUG>(DEBUG);

function App({ Component, pageProps }: AppProps) {
    return (
        <DebugContext.Provider value={DEBUG}>
            <ShuffleSeedContext.Provider value={new Date().getUTCMinutes()}>
                <Component {...pageProps} />
            </ShuffleSeedContext.Provider>
        </DebugContext.Provider>
    );
}

export default appWithTranslation(App);
