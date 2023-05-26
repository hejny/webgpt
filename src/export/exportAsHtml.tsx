import { MemoryRouter } from 'next-router-mock';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { renderToStaticMarkup } from 'react-dom/server';
import { BehaviorSubject } from 'rxjs';
import { DEBUG } from '../../config';
import { ShuffleSeedContext } from '../components/Shuffle/Shuffle';
import { SkinStyle } from '../components/SkinStyle/SkinStyle';
import { DebugContext } from '../pages/_app';
import { ShowcaseAppHead } from '../sections/00-AppHead/ShowcaseAppHead';
import { ShowcaseContent } from '../sections/ShowcaseContent/ShowcaseContent';
import { WallpapersContext } from '../utils/hooks/WallpapersContext';
import { IWallpaper } from '../utils/IWallpaper';
import { prettifyHtml } from './utils/prettifyHtml';

export function exportAsHtml(wallpaper: IWallpaper): string {
    const memoryRouter = new MemoryRouter();
    memoryRouter.pathname = '/showcase/[slug]';
    memoryRouter.query = { slug: wallpaper.id };

    let html = renderToStaticMarkup(
        <html>
            <RouterContext.Provider value={memoryRouter}>
                {/* <MemoryRouterProvider url={'/showcase/[slug]'}> */}
                <DebugContext.Provider value={DEBUG}>
                    <ShuffleSeedContext.Provider value={new Date().getUTCMinutes()}>
                        <WallpapersContext.Provider value={{ [wallpaper.id]: new BehaviorSubject(wallpaper) }}>
                            <ShowcaseAppHead isNextHeadUsed={false} />
                            <SkinStyle />
                            {/* TODO: <LanguagePicker /> */}

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
