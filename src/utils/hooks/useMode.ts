import { normalizeTo_SCREAMING_CASE } from 'n12';
import { useRouter } from 'next/router';
import { TupleToUnion } from 'type-fest';
import { useSsrDetection } from './useSsrDetection';

export const MODES = [
    'LOADING',
    'EDIT',
    'SHOW',
    'SHOW_THUMBNAIL',
] as const; /* <- [🧠] Which to use as/instead of enums, [...] as const with TupleToUnion OR {...} as const*/

interface IModes {
    mode: TupleToUnion<typeof MODES>;
    isPresenting: boolean;
    isEditable: boolean;
}

export function useMode(): IModes {
    const isServerRender = useSsrDetection();
    const router = useRouter();

    if (isServerRender) {
        return {
            mode: 'LOADING',
            isPresenting: true,
            isEditable: false,
        };
    }

    if (typeof router.query.mode !== 'string' /* <- This is a situation when there is no mode in GET params */) {
        return {
            mode: 'EDIT',
            isPresenting: false,
            isEditable: true,
        };
    }

    const mode = normalizeTo_SCREAMING_CASE(router.query.mode) as IModes['mode'];

    if (mode === 'LOADING' || !MODES.includes(mode)) {
        throw new Error(`Invalid mode in GET params "?mode=${router.query.mode}"`);
    }

    const isPresenting = mode === 'SHOW' || mode === 'SHOW_THUMBNAIL';
    const isEditable = !isPresenting;

    return {
        mode: mode as IModes['mode'],
        isPresenting,
        isEditable,
    };
}

/**
 * TODO: Change ACRY mode -> layout (or view)
 * TODO: Add GET param scenario (or mode)
 */
