import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { computeWallpaperUriid } from '../../../utils/computeWallpaperUriid';
import { extractTitleFromMarkdown } from '../../../utils/content/extractTitleFromMarkdown';
import { LikedStatus } from '../../../utils/hooks/useLikedStatusOfCurrentWallpaper';
import { serializeColorStats } from '../../../utils/image/utils/serializeColorStats';
import { IWallpaper } from '../../../utils/IWallpaper';
import { getSupabaseForBrowser } from '../../../utils/supabase/getSupabaseForBrowser';
import { string_wallpaper_id } from '../../../utils/typeAliases';
import { parseKeywordsFromWallpaper } from '../../Gallery/GalleryFilter/utils/parseKeywordsFromWallpaper';

interface SaveBoardButtonProps extends Pick<IWallpaper, 'src' | 'prompt' | 'content' | 'colorStats'> {
    parentWallpaperId: string_wallpaper_id;
    children?: React.ReactNode;
}
/**
 * @@@
 */
export function SaveBoardButton(props: SaveBoardButtonProps) {
    const { parentWallpaperId, src, prompt, content, colorStats, children } = props;

    const newWallpaper = useMemo(() => {
        const title = extractTitleFromMarkdown(content) || 'Untitled';
        const keywords = Array.from(parseKeywordsFromWallpaper({ prompt, content }));
        const newAnonymousWallpaper = {
            parent: parentWallpaperId,
            src,
            prompt,
            colorStats,
            content,
            title,
            keywords,
        };
        return {
            id: computeWallpaperUriid(newAnonymousWallpaper),
            ...newAnonymousWallpaper,
            colorStats: serializeColorStats(newAnonymousWallpaper.colorStats),
        };
    }, [parentWallpaperId, src, prompt, content, colorStats]);

    const persistWallpaper = async () => {
        const insertResult = await getSupabaseForBrowser().from('Wallpaper').insert(newWallpaper);

        // TODO: !! Util isInsertSuccessfull (status===201)
        console.log({ newWallpaper, insertResult });

        const key = `likedStatus_${newWallpaper.id}`;
        if (!window.localStorage.getItem(key)) {
            window.localStorage.setItem(key, 'LIKE' satisfies keyof typeof LikedStatus);
        }

        // !!! Remove> window.open(`/showcase/${newWallpaper.id}`, '_blank');
    };

    useEffect(() => {
        const wallpapersChannel = new BroadcastChannel('wallpaper_request');
        wallpapersChannel.onmessage = async (event) => {
            console.info('📩', { event });

            const { type, wallpaperId: requestedWallpaperId } = event.data;

            if (type !== 'REQUEST_WALLPAPER') {
                return;
            }

            console.info('💌', 'Requested wallpaper', requestedWallpaperId);

            if (requestedWallpaperId !== newWallpaper.id) {
                console.info('💔', 'But its not the correct wallpaper', { requestedWallpaperId, newWallpaper });
                return;
            }

            await persistWallpaper();

            wallpapersChannel.postMessage({
                type: 'READY_WALLPAPER',
                wallpaperId: newWallpaper.id,
            });
        };

        return () => {
            wallpapersChannel.close();
        };
    });

    return (
        <>
            <Link
                href={`/showcase/${newWallpaper.id}`}
                className={'button'}
                prefetch={false /* <- Note: We don`t want to pre-create anything */}
            >
                {children} (just direct link)
            </Link>
            <Link
                href={`/prepare/${newWallpaper.id}`}
                target={'_blank'}
                rel={'opener'}
                referrerPolicy={'same-origin'}
                className={'button'}
                prefetch={false /* <- Note: We don`t want to pre-create anything */}
            >
                {children}
            </Link>
        </>
    );
}

/**
 * TODO: !!! Just one link
 */
