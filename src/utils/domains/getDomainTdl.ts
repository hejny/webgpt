import { string_domain } from '@promptbook/types';
import { string_domain_tdl } from '@promptbook/types/esm/typings/types/typeAliases';

export function getDomainTdl(domain: string_domain): string_domain_tdl {
    return domain.split('.').pop() as string_domain_tdl;
}

/**
 * TODO: !!! Annotate
 */
