import { useSsrDetection } from '../../utils/hooks/useSsrDetection';

interface NoSsrProps {
    children: React.ReactNode;
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
