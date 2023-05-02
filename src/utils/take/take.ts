import { TakeChain } from './classes/TakeChain';
import { WithTake } from './interfaces/ITakeChain';
import { Takeable } from './interfaces/Takeable';

/**
 * @@@
 */
export function take<TValue extends Takeable>(initialValue: TValue): WithTake<TValue> {
    if (initialValue instanceof TakeChain) {
        return initialValue;
    }

    return new Proxy(new TakeChain(initialValue), {
        get(target, property, receiver) {
            if (Reflect.has(target, property)) {
                return Reflect.get(target, property, receiver);
            } else if (Reflect.has(initialValue, property)) {
                return Reflect.get(initialValue, property, receiver);
            } else {
                return undefined;
            }
        },
    }) as unknown as WithTake<TValue>;
}

/**
 * TODO: !!! Transfer back to Collboard (whole directory)
 * TODO: Optimize
 * TODO: Collision with lodash take utility
 * TODO: Better work with primitives
 * TODO: [🏌️‍♂️] Collision of TakeChain method names with initialValue subobjects property names
 * TODO: To documentation how to access deep proxy subobjects> .then(({ object }) => object)
 */
