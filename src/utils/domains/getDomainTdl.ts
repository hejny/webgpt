import type { string_domain, string_domain_tdl } from '../../utils/typeAliases';

export function getDomainTdl(domain: string_domain): string_domain_tdl {
    return domain.split('.').pop() as string_domain_tdl;
}

/**
 * TODO: !!! Annotate
 */
