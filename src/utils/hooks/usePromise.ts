import React from 'react';
import { Promisable } from 'type-fest';
import {
    IUseLoadableResultComplete,
    IUseLoadableResultError,
    IUseLoadableResultPending,
    IUseLoadableResultStatus
} from './useLoadable';

type IUsePromiseResult<TValue> =
    | IUseLoadableResultPending
    | IUseLoadableResultError
    | IUseLoadableResultComplete<TValue>;

/**
 * React hook that returns result of Promise or its pending/error state.
 *
 * @collboard-modules-sdk
 */
export function usePromise<TValue>(
    promise: Promisable<TValue>,
    deps?: React.DependencyList /* <- TODO: Import and use just a DependencyList */,
): IUsePromiseResult<TValue> {
    // console.log('🅰️', 'usePromise');

    const [result, setResult] = React.useState/* <- TODO: Import and use just a useState */ <IUsePromiseResult<TValue>>(
        {
            status: IUseLoadableResultStatus.Pending,
            value: undefined,
            error: undefined,
            isComplete: false,
        },
    );

    React.useEffect(
        /* <- TODO: Import and use just a useEffect */ () => {
            (async () => {
                try {
                    const value = await promise;
                    setResult({
                        status: IUseLoadableResultStatus.Complete,
                        value,
                        error: null,
                        isComplete: true,
                    });
                } catch (error) {
                    if (error instanceof Error) {
                        setResult({
                            status: IUseLoadableResultStatus.Error,
                            value: null,
                            error,
                            isComplete: true,
                        });
                    } else {
                        console.error(`Called usePromise with reject which not rejected Error `, {
                            thrown: error,
                        });
                    }
                }
            })();

            return () => {
                /* TODO: Probably add some destroy logic */
            };
        },
        // Note: Passing correct deps is up to usePromise caller.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        deps || [promise],
    );

    return result;
}

/**
 * TODO: [🧵] Move to external LIB for react loadables
 */
