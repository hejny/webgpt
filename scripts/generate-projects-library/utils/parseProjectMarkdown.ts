import { Converter } from 'showdown';
import spaceTrim from 'spacetrim';
import { removeMarkdownComments } from './removeMarkdownComments';

/**
 * Parse projects markdown
 */
export function parseProjectMarkdown(projectMarkdown: string): {
    title: string;
    description: string;
    images: {
        alt: string;
        src: string;
        href: string | null;
    }[];
} {
    projectMarkdown = removeMarkdownComments(projectMarkdown);

    let title: string | null = null;
    let descriptionMarkdown: string = '';
    const images: Array<{ alt: string; src: string; href: string | null }> = [];

    for (const line of projectMarkdown.split('\n').map((line) => line.trim())) {
        if (line.startsWith('#')) {
            if (title) {
                throw new Error(`Multiple titles in markdown`);
            } else {
                title = line.replace(/^#+\s*/, '');
            }
        } else {
            if (!title) {
                if (line !== '') {
                    throw new Error(`Description before title`);
                }
            } else {
                descriptionMarkdown += line + '\n';
            }
        }
    }

    for (const imageMatch of descriptionMarkdown.matchAll(/\[!\[(?<alt>.*?)\]\((?<src>.*?)\)\]\((?<href>.*?)\)/g)) {
        const { alt, src, href } = imageMatch.groups!;
        images.push({ alt, src, href });
        descriptionMarkdown = descriptionMarkdown.replace(imageMatch[0], '');
    }

    for (const imageMatch of descriptionMarkdown.matchAll(/!\[(?<alt>.*?)\]\((?<src>.*?)\)/g)) {
        const { alt, src } = imageMatch.groups!;
        images.push({ alt, src, href: null });
        descriptionMarkdown = descriptionMarkdown.replace(imageMatch[0], '');
    }

    descriptionMarkdown = spaceTrim(descriptionMarkdown);

    const converter = new Converter();
    const description = converter.makeHtml(descriptionMarkdown).split(`'`).join(`&apos;`);

    if (!title) {
        throw new Error(`No title in markdown`);
    }

    return { title, description, images };
}
