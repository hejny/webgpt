import { string_css_class } from '../typeAliases';
import { usePromise } from './usePromise';

/**
 * Import CSS module and return it
 * Note: This is useful making react components that are usable in dialogues - worker environment
 *
 * @param importedModule The result of `import('./.../styles.module.css')`
 * @returns Imported CSS module
 */
export function useStyleModule(importedModule: Promise<any>): Record<string_css_class, string_css_class> {
    const { value: styles } = usePromise(importedModule, []);
    return styles || {};
}
