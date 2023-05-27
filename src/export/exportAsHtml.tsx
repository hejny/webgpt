import { MemoryRouter } from 'next-router-mock';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { renderToStaticMarkup } from 'react-dom/server';
import { BehaviorSubject } from 'rxjs';
import spaceTrim from 'spacetrim';
import { ShuffleSeedContext } from '../components/Shuffle/Shuffle';
import { ExportContext } from '../pages/_app';
import { ShowcaseAppHead } from '../sections/00-AppHead/ShowcaseAppHead';
import { ShowcaseContent } from '../sections/ShowcaseContent/ShowcaseContent';
import { WallpapersContext } from '../utils/hooks/WallpapersContext';
import { IWallpaper } from '../utils/IWallpaper';
import { prettifyCss } from './utils/prettifyCss';
import { prettifyHtml } from './utils/prettifyHtml';

export async function exportAsHtml(wallpaper: IWallpaper): Promise<string> {
    const memoryRouter = new MemoryRouter();
    memoryRouter.pathname = '/showcase/[slug]';
    memoryRouter.query = { slug: wallpaper.id };

    const styles: Array<string> = [];

    // Note: Fetch all <style> into styles
    for (const styleElement of Array.from(document.querySelectorAll('style'))) {
        styles.push(styleElement.innerHTML);
    }

    // Note: Fetch all <link rel="stylesheet" into styles
    for (const linkElement of Array.from(document.querySelectorAll('link'))) {
        if (linkElement.rel !== 'stylesheet') {
            continue;
        }
        const response = await fetch(linkElement.href);
        const css = await response.text();
        styles.push(
            spaceTrim(
                (block) => `
                    /* ${linkElement.href} */

                    ${block(css)}
                
                `,
            ),
        );
    }

    // TODO: !! Make style prefixes/suffixes deterministic with custom prefixer/suffixer ShowcaseContent_background__lMFUd
    // TODO: !!! Before each style add filename/content which will be used as comment or as a filename
    // TODO: !!! Pick only needed styles
    // TODO: !!! Return alongisde with html the styles object to put them as separate files instead of inline
    // TODO: !!! Prettify styles
    // TODO: !! [🎗] Extract and process all inlined styles

    let html = renderToStaticMarkup(
        <html>
            <RouterContext.Provider value={memoryRouter}>
                {/* <MemoryRouterProvider url={'/showcase/[slug]'}> */}
                <ExportContext.Provider value={{ isExported: true }}>
                    <ShuffleSeedContext.Provider value={new Date().getUTCMinutes()}>
                        <WallpapersContext.Provider value={{ [wallpaper.id]: new BehaviorSubject(wallpaper) }}>
                            <ShowcaseAppHead isNextHeadUsed={false} />

                            {/* html = html.replace('</head>', `${styles.map((style) => `<style>${style}</style>`).join('\n')}</head>`); */}
                            {styles.map((style, i) => (
                                <style key={i} dangerouslySetInnerHTML={{ __html: prettifyCss(style) }} />
                            ))}

                            {/* TODO: Maybe <LanguagePicker /> */}

                            <body>
                                <ShowcaseContent />
                            </body>
                        </WallpapersContext.Provider>
                    </ShuffleSeedContext.Provider>
                </ExportContext.Provider>
            </RouterContext.Provider>
        </html>,
    );

    html = `<!DOCTYPE html>\n` + html;

    html = prettifyHtml(html);

    // TODO: !!! Fix links

    return html;
}
