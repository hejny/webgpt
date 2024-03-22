import { string_domain } from '@promptbook/types';

export function getDomainLevel(domain: string_domain): number {
    return domain.split('.').length;
}

/**
 * TODO: !!! Annotate
 * TODO: [🤞] Maybe there should be some special case for www. subdomains?
 */
