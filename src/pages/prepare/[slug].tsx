import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

export default function PreparePage() {
    const router = useRouter();

    console.log(router.query.slug);

    return <div>Preparing the page...</div> /* <- TODO: [👠] Some standard standalone page */;
}

export async function getStaticPaths() {
    return {
        paths: [], // <- Note: indicates that no page needs be created at build time
        fallback: true,
    };
}

export async function getStaticProps({
    locale,
    params,
}: {
    locale: string;
    params: any /* <- TODO: !! Type propperly + NOT manually */;
}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}
