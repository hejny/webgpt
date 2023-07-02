import { useRouter } from 'next/router';
import { TupleToUnion } from 'type-fest';
import { useSsrDetection } from './useSsrDetection';

// TODO: [🧠] !!!! Rename to more clear name PRESENTATION and PREVIEW
const MODES = ['LOADING', 'NORMAL', 'EXPLANATION', 'PRESENTATION', 'PREVIEW'] as const;

interface IModes {
    mode: TupleToUnion<typeof MODES>;
    isExplaining: boolean;
    isPresenting: boolean;
}

export function useMode(): IModes {
    const isServerRender = useSsrDetection();
    const router = useRouter();

    if (isServerRender) {
        return {
            mode: 'LOADING',
            isExplaining: false,
            isPresenting: true,
        };
    }

    if (typeof router.query.mode !== 'string') {
        return {
            mode: 'NORMAL',
            isExplaining: false,
            isPresenting: false,
        };
    }

    const mode = router.query.mode.toUpperCase() as IModes['mode'];

    if (mode === 'LOADING' || !MODES.includes(mode)) {
        throw new Error(`Invalid mode in GET params "?mode=${router.query.mode}"`);
    }

    const isExplaining = mode === 'EXPLANATION';
    const isPresenting = mode === 'PRESENTATION' || mode === 'PREVIEW';

    return {
        mode: mode as IModes['mode'],
        isExplaining,
        isPresenting,
    };
}
