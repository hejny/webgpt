import { useRouter } from 'next/router';
import { ReactNode } from 'react';

/**
 * A component that renders its children only if the locale matches the router locale
 *
 * @param {TranslateProps} props - The props of the component
 * @returns {JSX.Element} The rendered element or an empty fragment
 */
interface TranslateProps {
    /**
     * @@@
     */
    locale: string;

    children: ReactNode;
}

/**
 * @@@
 */
export function Translate(props: TranslateProps) {
    const { locale, children } = props;

    const router = useRouter();

    if (locale !== router.locale) {
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
