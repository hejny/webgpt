import type { AppProps } from 'next/app';
import { Barlow_Condensed } from 'next/font/google';
import { EXPORT_OPTIONS } from '../../config';
import '../components/AiComponents/ai-components.css';
import { ShuffleSeedContext } from '../components/Shuffle/ShuffleSeedContext';
import '../styles/globals.css';
import '../styles/reset.css';
import { ExportContext } from '../utils/hooks/ExportContext';

/**/
// Note: Production font
const uiFont = Barlow_Condensed({ weight: '400', style: 'normal', subsets: ['latin', 'latin-ext'] });
/**/

/*/
// Note: Font to have clear visual distinction between UI and Wallpaper
const uiFont = Dancing_Script({ weight: '400', subsets: ['latin', 'latin-ext'] });
/**/

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className={uiFont.className /* <- Note: [🕋] This font is not included in export css */} id="ui-root">
            <ExportContext.Provider value={EXPORT_OPTIONS}>
                <ShuffleSeedContext.Provider value={new Date().getUTCMinutes()}>
                    <Component {...pageProps} />
                </ShuffleSeedContext.Provider>
            </ExportContext.Provider>
        </div>
    );
}
