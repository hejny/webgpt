import { useRouter } from 'next/router';
import { string_translate_language } from '../typeAliases';

/**
 * Hook for getting current language of the app
 */
export function useLocale(): string_translate_language {
    const router = useRouter();
    return (router.locale || 'en') as string_translate_language;
}
