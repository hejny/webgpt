import { string_href, string_html } from '../../utils/typeAliases';

/**
 * Map all <a href="..."> by replacer
 */
export function mapLinksInHtml(content: string_html, replacer: (oldHref: string_href) => string_href): string_html {
    const pattern = /<a\s+href=(?<quote>["'])(?<href>[^"]*)\k<quote>/gi;

    while (true) {
        const match = pattern.exec(content);

        if (match === null) {
            break;
        }

        const { href: oldHref } = match.groups as { href: string_href };

        const newHref = replacer(oldHref);
        console.log(`!!!! Replacing links`, { oldHref, newHref });

        content = content.replace(oldHref, newHref);
    }

    return content;
}
