import Link from 'next/link';
import { useRouter } from 'next/router';

type CloseModalLinkProps = Omit<React.ComponentProps<'a'>, 'ref'>;

export function CloseModalLink(props: CloseModalLinkProps) {
    const router = useRouter();

    return (
        <Link
            href={{
                pathname: '/[wallpaper]',
                query: {
                    wallpaper: router.query.wallpaper,
                },
            }}
            {...props}
        />
    );
}
