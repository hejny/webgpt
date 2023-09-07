import type { DependencyList } from 'react';
import { useEffect, useState } from 'react';
import { Promisable } from 'type-fest';
import {
    IUseLoadableResultComplete,
    IUseLoadableResultError,
    IUseLoadableResultPending,
    IUseLoadableResultStatus,
} from './useLoadable';

type IUsePromiseResult<TValue> =
    | IUseLoadableResultPending
    | IUseLoadableResultError
    | IUseLoadableResultComplete<TValue>;

/**
 * React hook that returns result of Promise or its pending/error state.
 */
export function usePromise<TValue>(
    promise: Promisable<TValue>,
    deps?: DependencyList,
): IUsePromiseResult<TValue> {
    // console.log('🅰️', 'usePromise');

    const [result, setResult] = useState <IUsePromiseResult<TValue>>({
        status: IUseLoadableResultStatus.Pending,
        value: undefined,
        error: undefined,
        isComplete: false,
    });

    useEffect(
         () => {
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
