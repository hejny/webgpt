import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function TestPage() {
    return <>Test</>;
}

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}
