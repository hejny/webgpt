import { normalizeToKebabCase } from 'n12';
import { useRouter } from 'next/router';
import type { string_page } from '../typeAliases';

export function usePageName(): string_page {
    const router = useRouter();

    const page = router.query.page;

    if (Array.isArray(page)) {
        throw new Error(`Invalid page in GET params "?page=${page}"`);
    }

    if (page && normalizeToKebabCase(page) !== page) {
        throw new Error(`Page must be in kebab-case, got "${page}"`);
    }

    if (page === 'index') {
        throw new Error(`Page must not be "index", to get the index page do not specify the page in GET params`);
    }

    return page || 'index';
}
