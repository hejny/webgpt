const LINKS = {
    Collboard: 'https://collboard.com',
    'H-edu': 'https://h-edu.cz',
    'Czech.events': 'https://czech.events',
    'Pavol Hejný': 'https://www.pavolhejny.com',
    'Pavolem Hejným': 'https://www.pavolhejny.com',
    'Pavola Hejného': 'https://www.pavolhejny.com',
    'Tomáš Studeník': 'https://www.tomas-studenik.com',
    'Tomášem Studeníkem': 'https://www.tomas-studenik.com',
    'Tomáše Studeníka': 'https://www.tomas-studenik.com',
    // TODO: Add more links, inflections, people,...
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
