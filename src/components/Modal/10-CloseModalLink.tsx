import { WallpaperLink } from '../WallpaperLink/WallpaperLink';

type CloseModalLinkProps = Omit<React.ComponentProps<'a'>, 'ref'>;

/**
 * Renders a link that closes modal
 */
export function CloseModalLink(props: CloseModalLinkProps) {
    const { ...attributes } = props;
    return <WallpaperLink modal={null} {...attributes} />;
}
