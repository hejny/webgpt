import { useLocale } from '../../utils/hooks/useLocale';
import { string_markdown_text, string_translate_language } from '../../utils/typeAliases';

/**
 * A component that renders its children only if the locale matches the router locale
 *
 * @param {TranslateProps} props - The props of the component
 * @returns {JSX.Element} The rendered element or an empty fragment
 */
interface TranslateProps {
    /**
     * Language !!!
     */
    locale: string_translate_language;

    /**
     * Content to translate
     */
    children: string_markdown_text;
}

// Use only one <Translate> at once

/**
 * @@@
 */
export function Translate(props: TranslateProps) {
    const { locale: childrenLocale, children } = props;

    const currentLocale = useLocale();

    if (childrenLocale !== currentLocale) {
        return <>{/* [⛳] */}</>;
    }

    return <>{children}</>;
}

/**
 * TODO: !! [⛳] Do here a translation instead of empty fragment
 * TODO: !! Annotate
 * TODO: [🦟] Use <MarkdownContent/> here and enable automatical markdown translations with auto-enhanced markdown
 * TODO: [🦟][🧠] Should <Translate/> have same props as <MarkdownContent isUsingOpenmoji isEnhanced /> OR it should be set for all translate messages the same
 */
