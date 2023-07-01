import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { forTime } from 'waitasecond';
import { string_wallpaper_id } from '../../utils/typeAliases';

export default function PreparePage() {
    const router = useRouter();
    const wallpaperId = router.query.wallpaper as string_wallpaper_id;

    useEffect(() => {
        const wallpapersChannel = new BroadcastChannel('wallpaper_request');
        wallpapersChannel.onmessage = async (event) => {
            console.info('📩', { event });

            const { type, wallpaperId: readyWallpaperId } = event.data;

            if (type !== 'READY_WALLPAPER') {
                return;
            }

            console.info('💌', 'Ready wallpaper', readyWallpaperId);

            if (readyWallpaperId !== wallpaperId) {
                console.info('💔', 'But its not the correct wallpaper', { readyWallpaperId, wallpaperId });
                return;
            }

            await forTime(5000 /* <- TODO: !!! Remove or increase */);

            router.replace(`/showcase/${wallpaperId}`);
        };

        wallpapersChannel.postMessage({
            type: 'REQUEST_WALLPAPER',
            wallpaperId: wallpaperId,
        });

        return () => {
            wallpapersChannel.close();
        };
    });

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
