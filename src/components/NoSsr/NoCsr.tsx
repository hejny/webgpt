import { useSsrDetection } from '../../utils/hooks/useSsrDetection';
import { NoSsrProps } from './NoSsr';

/**
 * @@
 */
export function NoCsr(props: NoSsrProps) {
    const { children } = props;

    const isRunningOnServer = useSsrDetection();

    if (!isRunningOnServer) {
        return <></>;
    }

    return <>{children}</>;
}

/**
 * TODO: Maybe rename to OnlyServer / OnlySsr
 */
