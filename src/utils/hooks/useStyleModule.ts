import { string_css_class } from '../typeAliases';
import { usePromise } from './usePromise';

/**
 * !!! Annotate
 */
export function useStyleModule(importedModule: Promise<any>): Record<string_css_class, string_css_class> {
    const { value: styles } = usePromise(importedModule);
    return styles || {};
}
