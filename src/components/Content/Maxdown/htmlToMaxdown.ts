import type { string_html, string_maxdown } from '../../../utils/typeAliases';
import { validateMaxdown } from './validateMaxdown';

export function htmlToMaxdown(content: string_html): string_maxdown {


    


    return validateMaxdown(content);
}

/**
 * !!! Annotate
 */
