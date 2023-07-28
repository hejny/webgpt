import { WallpaperLink } from '../WallpaperLink/WallpaperLink';

type CloseModalLinkProps = Omit<React.ComponentProps<'a'>, 'ref'>;

export function CloseModalLink(props: CloseModalLinkProps) {
    return <WallpaperLink modal={null} {...props} />;
}
