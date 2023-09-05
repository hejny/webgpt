import { WallpaperLink } from '../WallpaperLink/WallpaperLink';

type OpenModalLinkProps = Omit<React.ComponentProps<'a'>, 'ref'> & { modal: string };

/**
 * Renders a link to open modal
 */
export function OpenModalLink(props: OpenModalLinkProps) {
    const { modal, ...attributes } = props;

    return (
        <>
            <WallpaperLink {...{ modal }} {...attributes} />
        </>
    );
}
