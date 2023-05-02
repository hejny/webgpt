import { ITakeChain } from '../interfaces/ITakeChain';
import { Takeable } from '../interfaces/Takeable';
import { take } from '../take';

export class TakeChain<TValue extends Takeable> implements ITakeChain<TValue> {
    public constructor(public value: TValue) {}

    public then<TResultValue extends Takeable>(
        callback: (oldValue: TValue) => TResultValue,
    ): TResultValue & ITakeChain<TResultValue> {
        const newValue = callback(this.value);
        return take(newValue);
    }
}
