import { useMemo } from 'react';

import { $provideClientId, IProvideClientIdOptions } from '../client/provideClientId';
import { client_id } from '../typeAliases';
import { usePromise } from './usePromise';
import { useSsrDetection } from './useSsrDetection';

/**
 * Checks if clientId is in localStorage and verified OR generates new one and pops up the dialogue to verify email
 *
 * @returns clientId
 */
export function useClientId(options: IProvideClientIdOptions): client_id | null {
    const isServerRender = useSsrDetection();

    const { isVerifiedEmailRequired } = options;

    const clientIdPromise = useMemo(async () => {
        if (isServerRender) {
            return null;
        }

        const clientId = await $provideClientId({ isVerifiedEmailRequired });

        return clientId;
    }, [isServerRender, isVerifiedEmailRequired]);

    const { value } = usePromise(clientIdPromise);

    return value || null;
}

/**
 * TODO: Figure out better name
 */
