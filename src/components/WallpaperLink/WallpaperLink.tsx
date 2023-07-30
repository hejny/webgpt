import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { TupleToUnion } from 'type-fest';
import { ExportContext } from '../../utils/hooks/ExportContext';
import { MODES } from '../../utils/hooks/useMode';
import { string_page, string_wallpaper_id } from '../../utils/typeAliases';

interface WallpaperLinkProps extends Omit<React.ComponentProps<'a'>, 'ref'> {
    wallpaperId?: string_wallpaper_id | null;
    mode?: TupleToUnion<typeof MODES>;
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
    const { isExported } = useContext(ExportContext);

    const query: Record<string, any> = {
        wallpaper: wallpaperId || router.query.wallpaper,
        mode: mode?.toLocaleLowerCase() || router.query.mode,
        page: page || router.query.page,
        modal: modal || router.query.modal,
    };

    if (wallpaperId === null || !query.wallpaper) {
        delete query.wallpaperId;
    }
    if (mode === 'NORMAL' || !query.mode) {
        delete query.mode;
    }
    if (page === 'index' || !query.page) {
        delete query.page;
    }
    if (modal === null || !query.modal) {
        delete query.modal;
    }

    if (!isExported) {
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
    } else {
        // TODO: Maybe detect if it is modal or mode is used and if throw error

        return (
            <a href={!query.page ? '/' : `/${query.page}.html`} {...props}>
                {children}
            </a>
        );
    }
}
