import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface OnlyReadyRouterProps {
    children: ReactNode;
}

/**
 * Detection if the router is fully ready
 *
 * If yes, the children are rendered as they are
 * If not, the children are not rendered at all
 */
export function OnlyReadyRouter(props: OnlyReadyRouterProps) {
    const { children } = props;
    const router = useRouter();

    if (!router.isReady || router.isFallback) {
        return (
            <>{/* TODO: Here should be maybe something like [The content will be shown when page fully loaded] */}</>
        );
    }

    return <>{children}</>;
}
