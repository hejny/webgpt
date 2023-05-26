import { useSsrDetection } from '../../utils/hooks/useSsrDetection';

export interface NoSsrProps {
    children: React.ReactNode;
}

/**
 * @@
 */
export function NoSsr(props: NoSsrProps) {
    const { children } = props;

    const isRunningOnServer = useSsrDetection();

    if (isRunningOnServer) {
        return <>{/* TODO: Here should be maybe something like [The content will be shown in the browser] */}</>;
    }

    return <>{children}</>;
}

/**
 * TODO: Maybe rename to OnlyClient / OnlyCsr
 */
