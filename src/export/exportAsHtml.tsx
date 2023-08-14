import { MemoryRouter } from 'next-router-mock';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { renderToStaticMarkup } from 'react-dom/server';
import { BehaviorSubject } from 'rxjs';
import spaceTrim from 'spacetrim';
import { NEXT_PUBLIC_URL } from '../../config';
import stripesBlackImage from '../../public/patterns/simple/stripes-black.png';
import stripesGreyImage from '../../public/patterns/simple/stripes-grey.png';
import { ShowcaseAppHead } from '../components/AppHead/ShowcaseAppHead';
import { PAGES_CONTENTS } from '../components/ShowcaseArticle/getPageContent';
import { ShowcaseContent } from '../components/ShowcaseContent/ShowcaseContent';
import { ShuffleSeedContext } from '../components/Shuffle/ShuffleSeedContext';
import { removeContentComments } from '../utils/content/removeContentComments';
import { ExportContext } from '../utils/hooks/ExportContext';
import { WallpapersContext } from '../utils/hooks/WallpapersContext';
import { IWallpaper } from '../utils/IWallpaper';
import { string_css, string_page } from '../utils/typeAliases';
import { HtmlExportFile } from './HtmlExportFile';
import { HtmlExportOptions } from './HtmlExportOptions';
import { splitCss } from './splitCss';
import { prettifyCss } from './utils/prettifyCss';
import { prettifyHtml } from './utils/prettifyHtml';
import { prettifyJavascript } from './utils/prettifyJavascript';
import { removeSourceMaps } from './utils/removeSourceMaps';
import { removeTodoComments } from './utils/removeTodoComments';

interface HtmlExport {
    files: Array<HtmlExportFile>;
}

export async function exportAsHtml(wallpaper: IWallpaper, options: HtmlExportOptions): Promise<HtmlExport> {
    const { stylesPlace, publicUrl } = options;

    const files: Array<HtmlExportFile> = [];
    const styles: Array<string> = [];

    // Note: Fetch all <style> into styles
    for (const styleElement of Array.from(document.querySelectorAll('style'))) {
        if (styleElement.hasAttribute('data-export-ignore')) {
            continue;
        }
        let css = styleElement.innerHTML satisfies string_css;
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
    const importRules: Array<string_css> = [];
    const configRules: Array<string_css> = [];
    const articleRules: Array<string_css> = [];
    const aiComponentsRules: Array<string_css> = [];
    const commonRules: Array<string_css> = [];

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

        // 4️⃣ AI components
        else if (rule.includes('ai-' /* <- TODO: Probbably better detection */)) {
            aiComponentsRules.push(rule);
        }

        // 5️⃣ Common
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

    for (const { pathname, content } of [
        { pathname: 'config.css', content: configStyle },
        {
            pathname: 'build/common.css' /* <- TODO: [🧠] What is the best folder (public, assets, build...?) */,
            content: spaceTrim(
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
            ),
        },
        {
            pathname: 'build/article.css' /* <- TODO: [🧠] What is the best folder (public, assets, build...?) */,
            content: spaceTrim(
                (block) => `
                    /**
                     * Note: This is the style of the article
                     */
        
                    ${block(articleRules.join('\n\n\n'))}
                `,
            ),
        },
        {
            pathname: 'build/ai-components.css' /* <- TODO: [🧠] What is the best folder (public, assets, build...?) */,
            content: spaceTrim(
                (block) => `
                    /**
                     * Note: This is the style of the interactive components in the page
                     */
        
                    ${block(aiComponentsRules.join('\n\n\n'))}
                `,
            ),
        },
    ]) {
        files.push({
            type: 'code',
            mimeType: 'text/css',
            pathname,
            content,
        });
    }

    function createPageHtml(pageName: string_page) {
        const memoryRouter = new MemoryRouter();
        memoryRouter.pathname = '/[wallpaper]';
        memoryRouter.query = { wallpaper: wallpaper.id };

        if (pageName !== 'index') {
            memoryRouter.query.page = pageName;
        }

        let html = renderToStaticMarkup(
            <html>
                <RouterContext.Provider value={memoryRouter}>
                    {/* <MemoryRouterProvider url={'/[wallpaper]'}> */}
                    <ExportContext.Provider value={{ isExported: true, publicUrl: publicUrl || NEXT_PUBLIC_URL }}>
                        <ShuffleSeedContext.Provider value={new Date().getUTCMinutes()}>
                            <WallpapersContext.Provider value={{ [wallpaper.id]: new BehaviorSubject(wallpaper) }}>
                                <ShowcaseAppHead>
                                    {stylesPlace == 'EXTERNAL'
                                        ? files
                                              .filter(({ mimeType }) => mimeType === 'text/css')
                                              .map(({ pathname }, i) => (
                                                  <link key={i} rel="stylesheet" href={pathname} />
                                              ))
                                        : files
                                              .filter(({ mimeType }) => mimeType === 'text/css')
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

        // TODO: !!! (probbably done) Fix here escaping

        // Note: Post-processing HTML after React render
        html = html.split(`async=""`).join(`async`);
        html = html.split(`defer=""`).join(`defer`);
        html = `<!DOCTYPE html>\n` + html;

        // Note: [🎡] Unwrapping here <ExportComment comment="..."/> components
        html = prettifyHtml(html) /* <- [1] TODO: Do not do this twice */;

        for (const match of Array.from(
            html.matchAll(/^(?<indentation>\s*)<div(?:\s+)data-comment="(?<comment>.*?)"(?:\s*)><\/div>/gims),
        )) {
            const { indentation, comment } = match.groups!;

            if (comment!.split('\n').length <= 1) {
                // Single-line comment
                html = html.split(match[0]).join(`<!--${comment}-->`);
            } else {
                // Multi-line comment
                const indentedComment = [
                    ...comment!
                        .split('\n')
                        .map((line, i) => ' ' + (i === 0 ? line : indentation + ' '.repeat('<!--'.length) + line)),
                    indentation,
                ].join('\n');
                html = html.split(match[0]).join(`<!--${indentedComment}-->`);
            }
        }

        return html;
    }

    // Note: Add index.html in front of all files
    files.unshift({
        type: 'page',
        mimeType: 'text/html',
        pathname: 'index.html',
        content: createPageHtml('index'),
    });

    // Note: Add rest of the pages
    for (const pageName of Object.keys(PAGES_CONTENTS)) {
        files.unshift({
            type: 'page',
            mimeType: 'text/html',
            pathname: `${pageName}.html`,
            content: createPageHtml(pageName),
        });
    }

    files.unshift({
        type: 'other',
        mimeType: 'text/markdown',
        pathname: 'README.md',
        content: removeContentComments(wallpaper.content),
    });

    for (const { name, src } of [
        {
            name: 'stripes-grey.png',
            src: stripesGreyImage.src,
        },
        {
            name: 'stripes-black.png',
            src: stripesBlackImage.src,
        },
        // <- TODO: In future put image assets dynamically NOT just one hardcoded stripes-grey.png and stripes-black.png file
    ]) {
        for (const file of files) {
            if (file.content instanceof Blob) {
                continue;
            }
            if (file.mimeType !== 'text/css') {
                continue;
            }
            file.content = file.content.split(`/patterns/simple/${name}`).join(`images/${name}`);
        }
        files.push({
            type: 'asset',
            mimeType: 'image/png',
            pathname: `images/${name}` /* <- TODO: [🧠] images/patterns/simple/stripes-grey.png vs images/stripes-grey.png */,
            content: await fetch(src).then((response) => response.blob()),
        });
    }

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
        if (typeof file.content === 'string') {
            file.content = removeTodoComments(file.content);
        }

        if (file.mimeType === 'text/html') {
            file.content = prettifyHtml(file.content as string) /* <- [1] TODO: Do not do this twice */;
        } else if (file.mimeType === 'text/css') {
            file.content = prettifyCss(file.content as string);
        } else if (file.mimeType === 'text/javascript') {
            file.content = prettifyJavascript(file.content as string);
        }
    }

    return { files };
}

/**
 * TODO: !!! build/article.css
 * TODO: !!! Article_Article__fAEyv -> Article
 * TODO: !!! In metadata in export there is wrong escaped characters
 * TODO: !!! Remove data-n-g attributes from export
 * TODO: !!! [🧠] /images vs /assets in exported zip
 * TODO: !!! [🧠] Add TODOs into README.md OR TODO.md/txt
 * TODO: !!! [🧠] Add CNAME, .htaccess, package.json, .vscode, .github, robots.txt, sitemap.xml, security.txt, .prettierrc,... allow user to choose according to needs and system
 * TODO: !! Add Favicon in zip (+other icons)
 * TODO: !!! Add license file into zip
 * TODO: !!! Fix translations in export
 * TODO: !! Pick only needed styles
 * TODO: Make style prefixes/suffixes custom (This is not urgent because suffixes looks deterministic ShowcaseContent_background__lMFUd)
 * TODO: !!! Generated by aiai in every file + metadata of images
 */
