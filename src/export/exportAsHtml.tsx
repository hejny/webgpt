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
import { string_css, string_html, string_uri } from '../utils/typeAliases';
import { prettifyCss } from './utils/prettifyCss';
import { prettifyHtml } from './utils/prettifyHtml';

interface HtmlExportOptions {
    /**
     * Where to place styles
     * - `EMBED` - Place styles into <style> tag
     * - `EXTERNAL` - Place styles into <link rel="stylesheet" href="style.css">
     */
    stylesPlace: 'EMBED' | 'EXTERNAL';
}

interface HtmlExport {
    files: Array<HtmlExportFile>;
}

interface HtmlExportFile {
    pathname: string;
    content: string_html | string_css;
}

export async function exportAsHtml(wallpaper: IWallpaper, options: HtmlExportOptions): Promise<HtmlExport> {
    const { stylesPlace } = options;
    const memoryRouter = new MemoryRouter();
    memoryRouter.pathname = '/showcase/[slug]';
    memoryRouter.query = { slug: wallpaper.id };

    const files: Array<HtmlExportFile> = [];
    let styles: Array<string> = [];

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

    // Note: Group styles into two groups 1. config and 2. common
    const configStyle = styles.find((style) => style.includes(':root' /* <- TODO: Probbably better detection */));
    const commonStyle = styles.filter((style) => style !== configStyle).join('\n\n\n');
    if (!configStyle) {
        throw new Error('Config style not found');
    }

    // Note: Add notes to styles and regroup them
    styles = [
        spaceTrim(
            (block) => `
                /**
                 * Note: This is the config style, it is used to configure the whole page.
                 */

                ${block(configStyle)}
            `,
        ),
        spaceTrim(
            (block) => `
                /**
                 * Note: This is merged common style, it is not in very optimal shape and will be improved in following versions.
                 *       If you want to make design changes, consider:
                 *          1. Making changes in separate file
                 *          2. Chage config style NOT common style
                 */

                ${block(commonStyle)}
            `,
        ),
    ];

    // Note: Prettify all styles
    styles = styles.map(prettifyCss);

    const stylesLinks: Array<string_uri> = [];
    if (stylesPlace == 'EXTERNAL') {
        if (styles.length !== 2) {
            throw new Error(`There are ${styles.length} styles but exatly 2 styles are expected`);
        }

        for (const { pathname, content } of [
            { pathname: 'config.css', content: styles[0] },
            {
                pathname: 'src/common.css' /* <- TODO: [🧠] What is the best folder (src, assets,...?) */,
                content: styles[1],
            },
        ]) {
            files.push({
                pathname,
                content,
            });
            stylesLinks.push(pathname);
        }
        styles = [];
    }

    let html = renderToStaticMarkup(
        <html>
            <RouterContext.Provider value={memoryRouter}>
                {/* <MemoryRouterProvider url={'/showcase/[slug]'}> */}
                <ExportContext.Provider value={{ isExported: true }}>
                    <ShuffleSeedContext.Provider value={new Date().getUTCMinutes()}>
                        <WallpapersContext.Provider value={{ [wallpaper.id]: new BehaviorSubject(wallpaper) }}>
                            <ShowcaseAppHead isNextHeadUsed={false}>
                                {stylesLinks.map((styleLink, i) => (
                                    <link key={i} rel="stylesheet" href={styleLink} />
                                ))}
                                {styles.map((style, i) => (
                                    <style key={i} dangerouslySetInnerHTML={{ __html: prettifyCss(style) }} />
                                ))}
                            </ShowcaseAppHead>

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

    files.push({
        pathname: 'index.html',
        content: html,
    });

    // Note: Go through all files and detect if there is some filename collision
    const filesMap = new Map<string, string>();
    for (const file of files) {
        const { pathname } = file;
        if (filesMap.has(pathname)) {
            throw new Error(`Filename collision: ${pathname}`);
        }
        filesMap.set(pathname, pathname);
    }

    return { files };
}

/**
 * TODO: !! [🎗] Extract and process all inlined styles
 * TODO: !! Pick only needed styles
 * TODO: Make style prefixes/suffixes custom (This is not urgent because suffixes looks deterministic ShowcaseContent_background__lMFUd)
 */
