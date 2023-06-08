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

export interface HtmlExportFile {
    pathname: string;
    content: string_html | string_css;
}

export async function exportAsHtml(wallpaper: IWallpaper, options: HtmlExportOptions): Promise<HtmlExport> {
    const { stylesPlace } = options;
    const memoryRouter = new MemoryRouter();
    memoryRouter.pathname = '/showcase/[wallpaper]';
    memoryRouter.query = { wallpaper: wallpaper.id };

    const files: Array<HtmlExportFile> = [];
    let styles: Array<string> = [];

    // Note: Fetch all <style> into styles
    for (const styleElement of Array.from(document.querySelectorAll('style'))) {
        if (styleElement.hasAttribute('data-export-ignore')) {
            continue;
        }
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

    // Note: Group styles into groups:
    //       - config
    //       - common
    //       - article
    const configStyle = styles.find((style) => style.includes(':root' /* <- TODO: Probbably better detection */));
    const articleStyle = styles.find((style) => style.includes('.Article' /* <- TODO: Probbably better detection */));
    const commonStyle = styles.filter((style) => [configStyle, articleStyle].includes(style)).join('\n\n\n');
    if (!configStyle) {
        throw new Error('Config style not found');
    }
    if (!articleStyle) {
        throw new Error('Article style not found');
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
                 *          3. Chage article style NOT common style
                 */

                ${block(commonStyle)}
            `,
        ),
        spaceTrim(
            (block) => `
                /**
                 * Note: This is the style of the article
                 */

                ${block(articleStyle)}
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
                pathname: 'build/common.css' /* <- TODO: [🧠] What is the best folder (public, assets, build...?) */,
                content: styles[1],
            },
            {
                pathname: 'build/article.css' /* <- TODO: [🧠] What is the best folder (public, assets, build...?) */,
                content: styles[2],
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
                {/* <MemoryRouterProvider url={'/showcase/[wallpaper]'}> */}
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

    files.unshift({
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
 * TODO: !! Make simmilar note as in css into html
 * TODO: !!!! Export preview
 * TODO: !!! Bubble css @import(s) on first place
 * TODO: !!! Remove invalid CSS
 * TODO: !!! build/article.css
 * TODO: !!! Article_Article__fAEyv -> Article
 * TODO: !!! In metadata in export there is wrong escaped characters
 * TODO: !!! In export there is wrong escaped characters in font usage
 * TODO: !!! Export fonts propperly: <div style="font-family:&#x27;Barlow Condensed&#x27;, sans-serif">
 * TODO: !!! Remove data-n-g attributes from export
 * TODO: !!! Include /images/patterns/simple/stripes-grey.png in export
 * TODO: !!! [🧠] /images vs /assets
 * TODO: !! Add Favicon in zip (+other icons)
 * TODO: !!! Add license file into zip
 * TODO: !!! Fix translations in export
 * TODO: !! [🎗] Extract and process all inlined styles
 * TODO: !! Pick only needed styles
 * TODO: Make style prefixes/suffixes custom (This is not urgent because suffixes looks deterministic ShowcaseContent_background__lMFUd)
 * TODO: !!! Generated by aiai in every file + metadata of images
 */
