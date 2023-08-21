import { Takeable } from './Takeable';

/**
 * Represents a value with take chain functionality ⁘
 */
export type WithTake<TValue extends Takeable> = TValue & ITakeChain<TValue>;

/**
 * Represents an interface for a take chain ⁘
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
