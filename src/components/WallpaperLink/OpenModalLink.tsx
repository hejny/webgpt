import type { ComponentProps } from 'react';
import { WallpaperLink } from './WallpaperLink';

type OpenModalLinkProps = Omit<ComponentProps<'a'>, 'ref' | 'role' /* <- [🍛] */> & { modal: string };

/**
 * Renders a link to open modal in the wallpaper route
 */
export function OpenModalLink(props: OpenModalLinkProps) {
    const { modal, ...attributes } = props;

    return <WallpaperLink {...{ modal }} {...attributes} />;
}
