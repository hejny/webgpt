import { Observable } from 'rxjs';
import { Promisable } from 'type-fest';

// TODO: !! Cleanup

//------------------------------------------------- Misc -------------------------------------------------

/**
 * Loadable represents value that is loaded, can be loaded via Promise or can update over a time via Observable.
 */
export type Loadable<TValue> = TValue | Promise<TValue> | Observable<TValue>;

//------------------------------------------------- Picking -------------------------------------------------

type OptionalKeys<TObject extends object> = {
    [K in keyof TObject]-?: {} extends Pick<TObject, K> ? K : never;
}[keyof TObject];
export type FlipOptional<TObject extends object> = Required<Pick<TObject, OptionalKeys<TObject>>> &
    Partial<Omit<TObject, OptionalKeys<TObject>>> extends infer O
    ? { [K in keyof O]: O[K] }
    : never;

/**
 * Removes an index signature from object
 * Keeps only known properies
 *
 * @see https://stackoverflow.com/a/51956054/10647824
 */
export type RemoveIndex<T> = {
    [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K];
};

/**
 * TODO: Maybe rename RemoveIndex to RemoveIndexSignature or OnlyKnown
 */

//------------------------------------------------- Arrays -------------------------------------------------

/**
 * Array with at least one item
 *
 * @collboard-modules-sdk
 */
export type ArrayFull<TItem> = {
    0: TItem;
} & Array<TItem>;

/**
 * Just an item or array of items or set of items
 *
 * @deprecated Using this is a bit antipattern use just Array
 * @collboard-modules-sdk
 */
export type Arrayable<TItem> = TItem | Array<TItem> | Set<TItem> /* TODO: | TypedArray  */;

/**
 * Just an item or array of items with at least one item
 *
 * @collboard-modules-sdk
 */
export type ArrayableFull<TItem> = TItem | ArrayFull<TItem>;

// TODO: Is there some wau how to make SetFull (to use it in IArrayableFull)?

/**
 * Array which can be wrapped in a Promise and all items can be also wrapped in a Promise
 *
 * @collboard-modules-sdk
 */
export type PromisableArray<TItem> = Promisable<Array<Promisable<TItem>>>;
