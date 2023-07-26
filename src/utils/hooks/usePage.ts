import { normalizeToKebabCase } from 'n12';
import { useRouter } from 'next/router';
import { string_page } from '../typeAliases';

export function usePage(): string_page {
    const router = useRouter();

    const page = router.query.page || 'index';

    if (Array.isArray(page)) {
        throw new Error(`Invalid page in GET params "?page=${page}"`);
    }

    if (normalizeToKebabCase(page) !== page) {
        throw new Error(`Page must be in kebab-case, got "${page}"`);
    }

    return page;
}
