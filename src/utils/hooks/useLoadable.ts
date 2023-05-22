import { isObservable } from 'rxjs';
import { Loadable } from '../typeHelpers';
import { useObservable } from './useObservable';
import { usePromise } from './usePromise';

/**
 * @collboard-modules-sdk
 *
 * @deprecated [🍿] Do not use enums but object as const OR 'LITERAL VALUES' instead
 */
export enum IUseLoadableResultStatus {
    Pending = 'PENDING',
    Ongoing = 'ONGOING',
    Error = 'ERROR',
    Complete = 'COMPLETE',
}

export interface IUseLoadableResultPending {
    status: IUseLoadableResultStatus.Pending;
    value: undefined;
    error: undefined;
    isComplete: false;
}

interface IUseLoadableResultOngoing<TValue> {
    status: IUseLoadableResultStatus.Ongoing;
    value: TValue;
    error: null;
    isComplete: false;
}

export interface IUseLoadableResultError {
    status: IUseLoadableResultStatus.Error;
    error: Error;
    value: null;
    isComplete: true;
}

export interface IUseLoadableResultComplete<TValue> {
    status: IUseLoadableResultStatus.Complete;
    value: TValue;
    error: null;
    isComplete: true;
}

export type IUseLoadableResult<TValue> =
    | IUseLoadableResultPending
    | IUseLoadableResultOngoing<TValue>
    | IUseLoadableResultError
    | IUseLoadableResultComplete<TValue>;

/**
 * React hook that returns current value of given Loadable.
 *
 * @collboard-modules-sdk
 */
export function useLoadable<Value>(loadable: Loadable<Value>): IUseLoadableResult<Value> {
    // Note: Ignoring rule react-hooks/rules-of-hooks because for same value this condition will always lead to same branch of if statement.
    if (loadable instanceof Promise /* <-  [🐶] */) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return usePromise(loadable);
    } else if (isObservable(loadable)) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useObservable(loadable);
    } else {
        return {
            status: IUseLoadableResultStatus.Complete,
            value: loadable,
            error: null,
            isComplete: true,
        };
    }
}

/**
 * TODO: Proppably also with using this hook, create <Loadable> component as a combination and replacement of AsyncContentComponent and ObservableContentComponent:
 *     > <Loadable>
 *     >    {async ()=>{
 *     >      ...
 *     >    }}
 *     >   <LoadableError>
 *     >     ...
 *     >   </LoadableError>
 *     > </Loadable>
 */

/**
 * TODO: [🐞] Proppably also allow to override deps like in usePromise
 * TODO: [🧵] Move to external LIB for react loadables
 */
