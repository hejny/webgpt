import { useState } from 'react';

/**
 * Returns a stateful value, and a function to update it.
 *
 * @param initialState The initial value of the state
 * @param reportStateUpdate A function that will be called with the new value of the state
 * @returns A stateful value, and a function to update it
 */
export function useStateWithReporting<TState>(
    initialState: TState | (() => TState),
    reportStateUpdate: (newState: TState) => void,
): [TState, (ewValue: TState) => void /* <- TODO: Dispatch<SetStateAction<TState>> */] {
    const [state, setState] = useState(initialState);

    return [
        state,
        (newState: TState) => {
            if (newState === state) {
                return;
            }
            reportStateUpdate(newState);
            setState(newState);
        },
    ];
}
