import { Oswald } from '@next/font/google';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { createContext } from 'react';
import { DEBUG } from '../../config';
import { ShuffleSeedContext } from '../components/Shuffle/Shuffle';
import '../styles/config.css';
import '../styles/globals.css';
import '../styles/reset.css';

const oswaltFont = Oswald({ weight: '400', style: 'normal', subsets: ['latin', 'latin-ext'] });
export const DebugContext = createContext<typeof DEBUG>(DEBUG);

function App({ Component, pageProps }: AppProps) {
    return (
        <DebugContext.Provider value={DEBUG}>
            <ShuffleSeedContext.Provider value={new Date().getUTCMinutes()}>
                <style jsx global>{`
                    html {
                        /* TODO: !!!! Google fonts optimization in Next is just not wotking reliably - use it basic css import */
                        font-family: ${oswaltFont.style.fontFamily}, sans-serif;
                    }
                `}</style>
                <Component {...pageProps} />
            </ShuffleSeedContext.Provider>
        </DebugContext.Provider>
    );
}

export default appWithTranslation(App);
