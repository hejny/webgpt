import Link from 'next/link';
import { useRouter } from 'next/router';

type OpenModalLinkProps = Omit<React.ComponentProps<'a'>, 'ref'> & { modal: string };

export function OpenModalLink(props: OpenModalLinkProps) {
    const { modal } = props;

    const router = useRouter();

    return (
        <>
            <Link
                href={{
                    pathname: '/[wallpaper]',
                    query: {
                        wallpaper: router.query.wallpaper,
                        modal,
                    },
                }}
                {...props}
            />
        </>
    );
}
