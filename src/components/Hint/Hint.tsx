import { NoCsr } from '../NoSsr/NoCsr';
import { NoSsr } from '../NoSsr/NoSsr';
import { HintCsr } from './HintCsr';
import type { HintProps } from './HintProps';

/**
 * Renders any content wrapped in a hint
 */
export function Hint(props: HintProps) {
    const { children } = props;

    return (
        <>
            <NoCsr>{children}</NoCsr>
            <NoSsr>
                <HintCsr {...props}>{children}</HintCsr>
            </NoSsr>
        </>
    );
}
