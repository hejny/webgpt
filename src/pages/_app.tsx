import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Dancing_Script } from 'next/font/google';
import { EXPORT_OPTIONS } from '../../config';
import '../components/AiComponents/ai-components.css';
import { ShuffleSeedContext } from '../components/Shuffle/ShuffleSeedContext';
import '../styles/globals.css';
import '../styles/reset.css';
import { ExportContext } from '../utils/hooks/ExportContext';


const font = Dancing_Script({ weight: '400', subsets: ['latin', 'latin-ext'] });
// !!!! const font = Barlow_Condensed({ weight: '400', style: 'normal', subsets: ['latin', 'latin-ext'] });

function App({ Component, pageProps }: AppProps) {
    return (
        <div className={font.className /* <- Note: [🕋] This font is not included in export css */} id="ui-root">
            <ExportContext.Provider value={EXPORT_OPTIONS}>
                <ShuffleSeedContext.Provider value={new Date().getUTCMinutes()}>
                    <Component {...pageProps} />
                </ShuffleSeedContext.Provider>
            </ExportContext.Provider>
        </div>
    );
}

export default appWithTranslation(App);
