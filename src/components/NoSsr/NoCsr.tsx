import { useSsrDetection } from '../../utils/hooks/useSsrDetection';

/**
 * Represents a component that renders its children only when server rendering is detected ⁘
 * 
 * @param {NoCsrProps} props - The props for the NoCsr component.
 * @returns {React.ReactNode} - The rendered React node.
 */
interface NoCsrProps {
    children: React.ReactNode /* !!! ACRY use ReactNode NOT  React.ReactNode */;
}

/**
 * @@@
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
