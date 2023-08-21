import { normalizeToKebabCase } from 'n12';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RefCallback, useContext } from 'react';
import { TupleToUnion } from 'type-fest';
import { ExportContext } from '../../utils/hooks/ExportContext';
import { MODES } from '../../utils/hooks/useMode';
import { string_page, string_wallpaper_id } from '../../utils/typeAliases';

/**
 * Renders a link for a wallpaper ⁘
 * 
 * @param {WallpaperLinkProps} props - The props for the WallpaperLink component.
 * @returns {JSX.Element} - The rendered WallpaperLink component.
 */
interface WallpaperLinkProps extends Omit<React.ComponentProps<'a'>, 'ref'> {
    wallpaperId?: string_wallpaper_id | null;
    mode?: TupleToUnion<typeof MODES>;
    page?: string_page;
    modal?: string | null;
    prefetch?: false;

    ref?: RefCallback<HTMLElement>;
}

/**
 * @@@
 */
export function WallpaperLink(props: WallpaperLinkProps) {
    const { wallpaperId, mode, page, modal, children, ref } = props;

    const router = useRouter();
    const { isExported } = useContext(ExportContext);

    const query: Record<string, any> = {
        wallpaperId: wallpaperId || router.query.wallpaperId,
        mode: mode ? normalizeToKebabCase(mode) : router.query.mode,
        page: page || router.query.page,
        modal: modal || router.query.modal,
    };

    if (wallpaperId === null || !query.wallpaperId) {
        delete query.wallpaperId;
    }
    if (mode === 'EDIT' || !query.mode) {
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
                    pathname: '/[wallpaperId]',
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
            <a href={!query.page ? '/' : `/${query.page}.html`} /* Note: Do not pass ref here */ {...props}>
                {children}
            </a>
        );
    }
}
