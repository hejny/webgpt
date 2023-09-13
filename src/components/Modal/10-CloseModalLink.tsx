import type { ComponentProps } from 'react';
import { WallpaperLink } from '../WallpaperLink/WallpaperLink';

type CloseModalLinkProps = Omit<ComponentProps<'a'>, 'ref' | 'role' /* <- [🍛] */>;

/**
 * Renders a link that closes modal
 */
export function CloseModalLink(props: CloseModalLinkProps) {
    const { ...attributes } = props;
    return <WallpaperLink modal={null} {...attributes} />;
}
