import { MemoryRouter } from 'next-router-mock';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { renderToStaticMarkup } from 'react-dom/server';
import { BehaviorSubject } from 'rxjs';
import { DEBUG } from '../../config';
import { ShuffleSeedContext } from '../components/Shuffle/Shuffle';
import { SkinStyle } from '../components/SkinStyle/SkinStyle';
import { DebugContext } from '../pages/_app';
import { ShowcaseAppMetadata } from '../sections/00-AppHead/ShowcaseAppMetadata';
import { ShowcaseContent } from '../sections/ShowcaseContent/ShowcaseContent';
import { WallpapersContext } from '../utils/hooks/WallpapersContext';
import { IWallpaper } from '../utils/IWallpaper';
import { prettifyHtml } from './utils/prettifyHtml';

export function exportAsHtml(wallpaper: IWallpaper): string {
    
    const memoryRouter = new MemoryRouter();
    memoryRouter.pathname = '/showcase/[slug]';
    memoryRouter.query = { slug: wallpaper.id };

    // Note: We are here in export context, so we don't use <Head> component from Next
    /* eslint-disable @next/next/no-head-element */

    let html = renderToStaticMarkup(
        <html>
            <RouterContext.Provider value={memoryRouter}>
                {/* <MemoryRouterProvider url={'/showcase/[slug]'}> */}
                <DebugContext.Provider value={DEBUG}>
                    <ShuffleSeedContext.Provider value={new Date().getUTCMinutes()}>
                        <WallpapersContext.Provider value={{ [wallpaper.id]: new BehaviorSubject(wallpaper) }}>
                            <head>
                                <ShowcaseAppMetadata />
                                <SkinStyle />
                                {/* TODO: <LanguagePicker /> */}
                            </head>
                            <body>
                                <ShowcaseContent />
                            </body>
                        </WallpapersContext.Provider>
                    </ShuffleSeedContext.Provider>
                </DebugContext.Provider>
            </RouterContext.Provider>
        </html>,
    );

    html = `<!DOCTYPE html>\n` + html;
    html = prettifyHtml(html);

    // TODO: !!! Fix links

    return html;
}
