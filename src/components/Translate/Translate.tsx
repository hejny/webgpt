import { useRouter } from 'next/router';
import { ReactNode } from 'react';

/**
 * A component that renders its children only if the locale matches the router locale ⁘
 * 
 * @param {TranslateProps} props - The props of the component
 * @returns {JSX.Element} The rendered element or an empty fragment
 */
interface TranslateProps {
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
        return <></>;
    }

    return <>{children}</>;
}
