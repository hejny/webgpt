import spaceTrim from 'spacetrim';
import contact from '../../../documents/contact.md';
import explanation from '../../../documents/explanation.md';
import gallery from '../../../documents/gallery.html';
import license from '../../../documents/license.html';
import pricing from '../../../documents/pricing.html';
import { string_html, string_markdown, string_page } from '../../utils/typeAliases';

const PAGES_CONTENT: Record<string_page, string_html | string_markdown> = {
    explanation,
    pricing,
    gallery,
    license,
    contact,
};

export function getPageContent(page: Omit<string_page, 'index'>) {
    let pageContent = PAGES_CONTENT[page as string];

    if (pageContent === undefined) {
        pageContent = spaceTrim(`
        
            # Page not found

            Sorry, but the page you are looking for does not exist.
            Try to go back to the [homepage](/).
        
        `);
    }

    return pageContent;
}
