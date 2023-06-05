import { useSsrDetection } from '../../utils/hooks/useSsrDetection';
import { NoSsrProps } from './NoSsr';

/**
 * @@
 */
export function NoCsr(props: NoSsrProps) {
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
