import { useSsrDetection } from '../../utils/hooks/useSsrDetection';

interface NoCsrProps {
    children: React.ReactNode;
}

/**
 * @@
 */
export function NoCsr(props: NoCsrProps) {
    const { children } = props;

    const isServerRender = useSsrDetection();

    if (!isServerRender) {
        return <></>;
    }

    return <>{children}</>;
}

/**
 * TODO: Maybe rename to OnlyServer / OnlySsr
 */
