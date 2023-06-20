import { MemoryRouter } from 'next-router-mock';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { renderToStaticMarkup } from 'react-dom/server';
import { BehaviorSubject } from 'rxjs';
import spaceTrim from 'spacetrim';
import { ShowcaseAppHead } from '../components/AppHead/ShowcaseAppHead';
import { ShowcaseContent } from '../components/ShowcaseContent/ShowcaseContent';
import { ShuffleSeedContext } from '../components/Shuffle/Shuffle';
import { ExportContext } from '../pages/_app';
import { removeMarkdownComments } from '../utils/content/removeMarkdownComments';
import { WallpapersContext } from '../utils/hooks/WallpapersContext';
import { IWallpaper } from '../utils/IWallpaper';
import { string_css, string_html, string_markdown } from '../utils/typeAliases';
import { splitCss } from './splitCss';
import { prettifyCss } from './utils/prettifyCss';
import { prettifyHtml } from './utils/prettifyHtml';
import { prettifyJavascript } from './utils/prettifyJavascript';
import { removeSourceMaps } from './utils/removeSourceMaps';
import { removeTodoComments } from './utils/removeTodoComments';

export interface HtmlExportOptions {
    /**
     * Where to place styles
     * - `EMBED` - Place styles into <style> tag
     * - `EXTERNAL` - Place styles into <link rel="stylesheet" href="style.css">
     */
    stylesPlace: 'EMBED' | 'EXTERNAL';

    publicUrl: URL;
}

interface HtmlExport {
    files: Array<HtmlExportFile>;
}

export interface HtmlExportFile {
    type: 'html' | 'css' | 'javascript' | 'image' | 'other';
    pathname: string;
    content: string_html | string_css | string_markdown | string;
}

export async function exportAsHtml(wallpaper: IWallpaper, options: HtmlExportOptions): Promise<HtmlExport> {
    const { stylesPlace, publicUrl } = options;
    const memoryRouter = new MemoryRouter();
    memoryRouter.pathname = '/showcase/[wallpaper]';
    memoryRouter.query = { wallpaper: wallpaper.id };

    const files: Array<HtmlExportFile> = [];
    const styles: Array<string> = [];

    // Note: Fetch all <style> into styles
    for (const styleElement of Array.from(document.querySelectorAll('style'))) {
        if (styleElement.hasAttribute('data-export-ignore')) {
            continue;
        }
        let css = styleElement.innerHTML;
        css = removeSourceMaps(css);
        styles.push(css);
    }

    // Note: Fetch all <link rel="stylesheet" into styles
    for (const linkElement of Array.from(document.querySelectorAll('link'))) {
        if (linkElement.rel !== 'stylesheet') {
            continue;
        }
        const response = await fetch(linkElement.href);
        let css = await response.text();
        css = removeSourceMaps(css);
        styles.push(
            spaceTrim(
                (block) => `
                    /* ${linkElement.href} */

                    ${block(css)}
                
                `,
            ),
        );
    }

    // Note: Join styles into one chunk
    const style = styles.join('\n\n\n');

    // Note: Split styles into rules
    const rules = splitCss(style);

    // Note: Group style rules into 34️⃣ groups:
    const importRules: Array<string> = [];
    const configRules: Array<string> = [];
    const articleRules: Array<string> = [];
    const commonRules: Array<string> = [];

    for (const rule of rules) {
        // 1️⃣ Imports
        if (rule.includes('@import' /* <- TODO: Probbably better detection */)) {
            importRules.push(rule);
        }
        // 2️⃣ Config
        else if (rule.includes(':root' /* <- TODO: Probbably better detection */)) {
            configRules.push(rule);
        }
        // 3️⃣ Article
        else if (rule.includes('.Article' /* <- TODO: Probbably better detection */)) {
            articleRules.push(rule);
        }
        // 4️⃣ Common
        else {
            commonRules.push(rule);
        }
    }

    const configStyle = spaceTrim(
        (block) => `
            /**
             * Note: This is the config style, it is used to configure the whole page.
             */

            ${block(configRules.join('\n\n\n'))}

        `,
    );

    const commonStyle = spaceTrim(
        (block) => `
            /**
             * Note: This is merged common style, it is not in very optimal shape and will be improved in following versions.
             *       If you want to make design changes, consider:
             *          1. Making changes in separate file
             *          2. Chage config style NOT common style
             *          3. Chage article style NOT common style
             */

            ${block(importRules.join('\n\n\n'))}

            ${block(commonRules.join('\n\n\n'))}
        `,
    );

    const articleStyle = spaceTrim(
        (block) => `
            /**
             * Note: This is the style of the article
             */

            ${block(articleRules.join('\n\n\n'))}
        `,
    );

    for (const { pathname, content } of [
        { pathname: 'config.css', content: configStyle },
        {
            pathname: 'build/common.css' /* <- TODO: [🧠] What is the best folder (public, assets, build...?) */,
            content: commonStyle,
        },
        {
            pathname: 'build/article.css' /* <- TODO: [🧠] What is the best folder (public, assets, build...?) */,
            content: articleStyle,
        },
    ]) {
        files.push({
            type: 'css',
            pathname,
            content,
        });
    }

    let html = renderToStaticMarkup(
        <html>
            <RouterContext.Provider value={memoryRouter}>
                {/* <MemoryRouterProvider url={'/showcase/[wallpaper]'}> */}
                <ExportContext.Provider value={{ isExported: true, publicUrl }}>
                    <ShuffleSeedContext.Provider value={new Date().getUTCMinutes()}>
                        <WallpapersContext.Provider value={{ [wallpaper.id]: new BehaviorSubject(wallpaper) }}>
                            <ShowcaseAppHead>
                                {stylesPlace == 'EXTERNAL'
                                    ? files
                                          .filter(({ type }) => type === 'css')
                                          .map(({ pathname }, i) => <link key={i} rel="stylesheet" href={pathname} />)
                                    : files
                                          .filter(({ type }) => type === 'css')
                                          .map(({ pathname, content }, i) => (
                                              <style
                                                  key={i}
                                                  dangerouslySetInnerHTML={{
                                                      __html: prettifyCss(
                                                          spaceTrim(
                                                              (block) => `
                                                                    /**
                                                                     * 📁 ${pathname}
                                                                     */

                                                                    ${block(style)}
                                                                
                                                                `,
                                                          ),
                                                      ),
                                                  }}
                                              />
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

    // Note: [🎡]
    html = html.split('<dd>').join('').split('</dd>').join('');

    html = `<!DOCTYPE html>\n` + html;

    files.unshift({
        type: 'html',
        pathname: 'index.html',
        content: html,
    });

    // TODO: !!! Add license

    files.unshift({
        type: 'other',
        pathname: 'README.md',
        content: removeMarkdownComments(wallpaper.content),
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

    // Note: Postprocessing
    for (const file of files) {
        if (!['html', 'css', 'javascript'].includes(file.type)) {
            continue;
        }
        file.content = removeTodoComments(file.content);

        if (file.type === 'html') {
            file.content = prettifyHtml(file.content);
        } else if (file.type === 'css') {
            file.content = prettifyCss(file.content);
        } else if (file.type === 'javascript') {
            file.content = prettifyJavascript(file.content);
        }
    }

    return { files };
}

/**
 * TODO: !! Make simmilar note as in css into html
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
 * TODO: !!! Add CNAME
 * TODO: !! Add Favicon in zip (+other icons)
 * TODO: !!! Add license file into zip
 * TODO: !!! Fix translations in export
 * TODO: !! [🎗] Extract and process all inlined styles
 * TODO: !! Pick only needed styles
 * TODO: Make style prefixes/suffixes custom (This is not urgent because suffixes looks deterministic ShowcaseContent_background__lMFUd)
 * TODO: !!! Generated by aiai in every file + metadata of images
 */
