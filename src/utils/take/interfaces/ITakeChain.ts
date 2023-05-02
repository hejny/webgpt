import { Takeable } from './Takeable';

/**
 * @@@
 */
export type WithTake<TValue extends Takeable> = TValue & ITakeChain<TValue>;

/**
 * @@@
 */
export interface ITakeChain<TValue extends Takeable> {
    readonly value: TValue;
    then<TResultValue extends Takeable>(callback: (value: TValue) => TResultValue): WithTake<TResultValue>;

    /*
    TODO:
    @alias for then which not support conversion of Take chain into the Promise chain
    pipe(): TValue & ITakeChain<TValue>;
    use():
    catch():
    */
}

/**
 * TODO: ITakeChain should implementing PromiseLike interface
 * TODO: Maybe method finally
 */
