import { useEffect, useState } from 'react';
import { BehaviorSubject, Observable } from 'rxjs';
import {
    IUseLoadableResult,
    IUseLoadableResultError,
    IUseLoadableResultPending,
    IUseLoadableResultStatus,
} from './useLoadable';

/**
 * React hook that returns current value of given Observable.
 */
export function useObservable<TValue>(
    observable: BehaviorSubject<TValue>,
): Exclude<IUseLoadableResult<TValue>, IUseLoadableResultPending | IUseLoadableResultError>;
export function useObservable<TValue>(observable: Observable<TValue>): IUseLoadableResult<TValue>;
export function useObservable<TValue>(observable: Observable<TValue>): IUseLoadableResult<TValue> {
    let initialValue: IUseLoadableResult<TValue>;

    if (!(observable instanceof BehaviorSubject)) {
        initialValue = {
            status: IUseLoadableResultStatus.Pending,
            value: undefined,
            error: undefined,
            isComplete: false,
        };
    } else {
        initialValue = {
            status: IUseLoadableResultStatus.Ongoing,
            value: observable.value,
            error: null,
            isComplete: false,
        };
    }

    const [result, setResult] = useState<IUseLoadableResult<TValue>>(initialValue);

    useEffect(
        () => {
            const subscription = observable.subscribe({
                next(value) {
                    setResult({
                        status: IUseLoadableResultStatus.Ongoing,
                        value,
                        error: null,
                        isComplete: false,
                    });
                },
                complete() {
                    setResult({
                        status: IUseLoadableResultStatus.Complete,
                        value: result.value!,
                        error: null,
                        isComplete: true,
                    });
                },
                error(error) {
                    setResult({
                        status: IUseLoadableResultStatus.Error,
                        value: null,
                        error,
                        isComplete: true,
                    });
                },
            });

            return () => {
                subscription.unsubscribe();
            };
        },
        // Note: result.value is just subdependency of observable
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [observable],
    );

    return result;
}

/**
 * TODO: [🐞] Proppably also allow to override deps like in usePromise
 * TODO: [🧵] Move to external LIB for react loadables
 */
