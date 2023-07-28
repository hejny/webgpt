import Link from 'next/link';
import { useRouter } from 'next/router';
import { TupleToUnion } from 'type-fest';
import { MODES } from '../../utils/hooks/useMode';
import { string_page, string_wallpaper_id } from '../../utils/typeAliases';

interface WallpaperLinkProps extends Omit<React.ComponentProps<'a'>, 'ref'> {
    wallpaperId?: string_wallpaper_id | null;
    mode?: TupleToUnion<typeof MODES> | null;
    page?: string_page;
    modal?: string | null;
    prefetch?: false;
}

/**
 * @@
 */
export function WallpaperLink(props: WallpaperLinkProps) {
    const { wallpaperId, mode, page, modal, children } = props;

    const router = useRouter();

    const query: Record<string, any> = {
        wallpaper: wallpaperId || router.query.wallpaper,
        mode: mode?.toLocaleLowerCase() || router.query.mode,
        page: page || router.query.page,
        modal: modal || router.query.modal,
    };

    if (wallpaperId === null || !query.wallpaper) {
        delete query.wallpaperId;
    }
    if (mode === null || !query.mode) {
        delete query.mode;
    }
    if (page === 'index' || !query.page) {
        delete query.page;
    }
    if (modal === null || !query.modal) {
        delete query.modal;
    }

    return (
        <Link
            href={{
                pathname: '/[wallpaper]',
                query,
            }}
            {...props}
        >
            {children}
        </Link>
    );
}
