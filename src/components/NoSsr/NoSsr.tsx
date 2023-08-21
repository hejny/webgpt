import { ReactNode } from 'react';
import { useSsrDetection } from '../../utils/hooks/useSsrDetection';

/**
 * Component that delays rendering its children until the client-side hydration is complete ⁘
 * If server-side rendering is detected, an empty fragment is returned.
 *
 * @param props - The component props.
 * @returns The NoSsr component.
 */
interface NoSsrProps {
    /**
     * The children to render during client rendering
     *
     * In case of server rendering, the children are not rendered at all
     * In case of client rendering, the children are rendered as <NoCsr/> would not be used at all
     */
    children: ReactNode;
}

/**
 * @@@
 */
export function NoSsr(props: NoSsrProps) {
    const { children } = props;

    const isServerRender = useSsrDetection();

    if (isServerRender) {
        return <>{/* TODO: Here should be maybe something like [The content will be shown in the browser] */}</>;
    }

    return <>{children}</>;
}

/**
 * TODO: Maybe rename to OnlyClient / OnlyCsr
 */
