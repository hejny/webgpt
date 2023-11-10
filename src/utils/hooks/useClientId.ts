import { uuid } from '@promptbook/types';
import { useMemo } from 'react';

import { IProvideClientIdOptions, provideClientId } from '../supabase/provideClientId';
import { usePromise } from './usePromise';
import { useSsrDetection } from './useSsrDetection';

/**
 * Checks if clientId is in localStorage and verified OR generates new one and pops up the dialogue to verify email
 *
 * @returns clientId
 */
export function useClientId(options: IProvideClientIdOptions): uuid | null {
    const isServerRender = useSsrDetection();

    const clientIdPromise = useMemo(async () => {
        if (isServerRender) {
            return null;
        }

        const clientId = await provideClientId(options);

        return clientId;
    }, [isServerRender, options /* <- TODO: Is it OK to have here object? */]);

    const { value } = usePromise(clientIdPromise);

    return value || null;
}

/**
 * TODO: Figure out better name
 */
