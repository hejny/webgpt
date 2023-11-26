import spaceTrim from 'spacetrim';
import type { string_html, string_maxdown } from '../../../utils/typeAliases';
import { markdownConverter } from '../markdownConverter';

export function maxdownToHtml(content: string_maxdown): string_html {
    let enhancedContent = spaceTrim(content || '');

    let html = markdownConverter.makeHtml(enhancedContent);

    // Note: Removing empty paragraphs
    html = html.split(/<p>\s*<\/p>/g).join('');

    // Note: Replacing font comments with divs
    let isFontTagOpened = false;
    const htmlLines: string_html[] = [];
    for (let htmlLine of html.split('\n')) {
        const fontMatch = htmlLine.match(/<!--font:(?<font>.*?)-->/);

        if (!fontMatch) {
            htmlLines.push((isFontTagOpened ? '    ' : '') + htmlLine);
        } else {
            if (isFontTagOpened) {
                htmlLines.push('</div>');
            }

            const font = fontMatch.groups?.font;

            // Note: [💅] Keeping font family unquoted
            //       There is some problem with escaping in export:
            //       - <div style="font-family:&#x27;Barlow Condensed&#x27;, sans-serif">
            htmlLines.push(
                `<div style="font-family:${font}, sans-serif;">` /* <- TODO: Do not hardcode sans-serif */ /* <- [🎗] */,
            );

            isFontTagOpened = true;
        }
    }
    if (isFontTagOpened) {
        htmlLines.push('</div>');
    }

    html = htmlLines.join('\n');

    return html;
}

/*
export function htmlToMaxdown(content: string_html): string_maxdown {
}

/**
 * !!! Annotate
 * TODO: [🔤] !!!
 * 
 * TODO: [🧠] Do here somewhere normalizeDashes
 * TODO: [🧠] Do here somewhere linkMarkdown (but with dynamic list of what to link)
 */
