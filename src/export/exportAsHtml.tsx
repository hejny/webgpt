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

export async function exportAsHtml(wallpaper: IWallpaper): Promise<string> {
    const memoryRouter = new MemoryRouter();
    memoryRouter.pathname = '/showcase/[slug]';
    memoryRouter.query = { slug: wallpaper.id };

    const styles = Array.from(document.querySelectorAll('style')).map((style) => style.innerHTML);
    // TODO: !!! Make style prefixes/suffixes deterministic with custom prefixer/suffixer
    // TODO: !!! Pick only needed styles
    // TODO: !!! Return alongisde with html the styles object to put them as separate files instead of inline
    // TODO: !!! Prettify styles

    let html = renderToStaticMarkup(
        <html>
            <RouterContext.Provider value={memoryRouter}>
                {/* <MemoryRouterProvider url={'/showcase/[slug]'}> */}
                <DebugContext.Provider value={DEBUG}>
                    <ShuffleSeedContext.Provider value={new Date().getUTCMinutes()}>
                        <WallpapersContext.Provider value={{ [wallpaper.id]: new BehaviorSubject(wallpaper) }}>
                            <ShowcaseAppHead isNextHeadUsed={false} />
                            <SkinStyle />
                            {/* html = html.replace('</head>', `${styles.map((style) => `<style>${style}</style>`).join('\n')}</head>`); */}
                            {styles.map((style, i) => (
                                <style key={i} dangerouslySetInnerHTML={{ __html: style }} />
                            ))}

                            {/* TODO: Maybe <LanguagePicker /> */}

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
