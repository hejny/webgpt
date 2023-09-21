import Link from 'next/link';
import { RefCallback, useContext } from 'react';
import { ExportContext } from '../../utils/hooks/ExportContext';
import { UseWallpaperLinkOptions, useWallpaperLinkQuery } from './useWallpaperLinkQuery';

interface WallpaperLinkProps
    extends Omit<React.ComponentProps<'a'>, 'ref' | 'role' /* <- [🍛] */>,
        UseWallpaperLinkOptions {
    prefetch?: false;
    ref?: RefCallback<HTMLElement>;
}

/**
 * Renders a link in the wallpaper route
 */
export function WallpaperLink(props: WallpaperLinkProps) {
    const { wallpaperId, role, scenario, page, modal, children, ref, ...attributes } = props;

    const { isExported } = useContext(ExportContext);
    const query = useWallpaperLinkQuery({ wallpaperId, role, scenario, page, modal });

    if (!isExported) {
        return (
            <Link
                href={{
                    pathname: '/[wallpaperId]',
                    query,
                }}
                {...{ ref }}
                {...attributes}
            >
                {children}
            </Link>
        );
    } else {
        // TODO: Maybe detect if it is modal or mode is used and if throw error

        return (
            <a href={!query.page ? '/' : `/${query.page}.html`} /* Note: Do not pass ref here */ {...attributes}>
                {children}
            </a>
        );
    }
}
