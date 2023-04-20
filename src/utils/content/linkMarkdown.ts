const LINKS = {
    Collboard: 'https://collboard.com',
    'H-edu': 'https://h-edu.cz',
    'Czech.events': 'https://czech.events',
    'Česká společnost ornitologická': 'https://www.birdlife.cz/',
    'České společnosti ornitologické': 'https://www.birdlife.cz/',
    'Startup Weekendu': 'https://startovani.cz/',
    // TODO: !!! 'Startup Weekend': 'https://startovani.cz/',

    // TODO: !!! České společnosti ornitologické vs Česká společnost ornitologická
    // TODO: !!! Startup Weekend vs Startup Weekendu
};

/**
 * Add links to plain text
 *
 * @param contentText text with keywords to be shown as links
 * @returns text with links in markdown format
 */
export function linkMarkdown(contentText: string): string {
    let contentMarkdown = contentText;

    for (const [word, href] of Object.entries(LINKS)) {
        contentMarkdown = contentMarkdown.split(word).join(`[${word}](${href})`);
    }

    return contentMarkdown;
}
