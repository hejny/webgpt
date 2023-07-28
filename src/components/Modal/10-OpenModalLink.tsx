import { WallpaperLink } from '../WallpaperLink/WallpaperLink';

type OpenModalLinkProps = Omit<React.ComponentProps<'a'>, 'ref'> & { modal: string };

export function OpenModalLink(props: OpenModalLinkProps) {
    const { modal } = props;

    return (
        <>
            <WallpaperLink {...{ modal }} {...props} />
        </>
    );
}
