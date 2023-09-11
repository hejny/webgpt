import { useRouter } from 'next/router';
import { useSsrDetection } from './useSsrDetection';

/**
 * Hook for getting currently opened modal name from GET params
 */
export function useModal(): string | null {
    const isServerRender = useSsrDetection();
    const router = useRouter();

    if (isServerRender) {
        return null;
    }

    if (typeof router.query.modal !== 'string') {
        // This is a situation when there is no ?modal=... in GET params
        return null;
    }

    return router.query.modal;
}

/**
 * TODO: Do more checks and validations here (like as in useRole, useScenario, etc.)
 */
