import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface TranslateProps {
    locale: string;
    children: ReactNode;
}

export function Translate(props: TranslateProps) {
    const { locale, children } = props;

    const router = useRouter();

    if (locale !== router.locale) {
        return <></>;
    }

    return <>{children}</>;
}
