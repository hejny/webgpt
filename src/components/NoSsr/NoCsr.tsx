import { ReactNode } from 'react';
import { useSsrDetection } from '../../utils/hooks/useSsrDetection';

interface NoCsrProps {
    /**
     * The children to render during server rendering
     *
     * In case of server rendering, the children are rendered as <NoCsr/> would not be used at all
     * In case of client rendering, the children are not rendered at all
     */
    children: ReactNode;
}

/**
 * Detection for server/client rendering
 *
 * In case of server rendering, the children are rendered as <NoCsr/> would not be used at all
 * In case of client rendering, the children are not rendered at all
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
