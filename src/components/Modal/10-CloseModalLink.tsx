import { WallpaperLink } from '../WallpaperLink/WallpaperLink';

type CloseModalLinkProps = Omit<React.ComponentProps<'a'>, 'ref'>;

/**
 * Renders link that closes modal
 */
export function CloseModalLink(props: CloseModalLinkProps) {
    return <WallpaperLink modal={null} {...props} />;
}
