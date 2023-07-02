import { string_title } from '../typeAliases';

/**
 * Extract the first heading from HTML using regex
 *
 * @param contentText HTML
 * @returns heading
 */
export function extractTitleFromHtml(contentText: string): string_title | null {
    return contentText.match(/<(h[1-6]).*?>(?<heading>.*)<\/\1>/is)?.groups?.heading ?? null;
}
