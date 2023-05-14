import { Oswald } from '@next/font/google';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { createContext } from 'react';
import { DEBUG } from '../../config';
import { ShuffleSeedContext } from '../components/Shuffle/Shuffle';
import '../styles/globals.css';
import '../styles/reset.css';
import '../styles/fonts.css';

const oswaltFont = Oswald({ weight: '400', style: 'normal', subsets: ['latin', 'latin-ext'] });
export const DebugContext = createContext<typeof DEBUG>(DEBUG);

function App({ Component, pageProps }: AppProps) {
    return (
        <DebugContext.Provider value={DEBUG}>
            <ShuffleSeedContext.Provider value={new Date().getUTCMinutes()}>
                <style jsx global>{`
                    html {
                        font-family: ${oswaltFont.style.fontFamily}, sans-serif;
                    }
                `}</style>
                <Component {...pageProps} />
            </ShuffleSeedContext.Provider>
        </DebugContext.Provider>
    );
}

export default appWithTranslation(App);
