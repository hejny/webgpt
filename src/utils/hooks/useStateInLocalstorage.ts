import { useEffect, useState } from 'react';
import { spaceTrim } from 'spacetrim';

export function useStateInLocalstorage<T extends string>(
    key: string,
    initialState: T,
): [state: T, setState: (newState: T) => void, isLoaded: boolean] {
    if (
        // TODO: Maybe we don’t need whole this with wrapping the ControlPanelLikeButtons with <NoSsr>...</NoSsr>

        typeof window === 'undefined'
        /* < Note: We are NOT using here useSsrDetection because
                   useSsrDetection always starts with true and then turns off when detects CSR
                   BUT in this case it will just crash and does not even start the app.
        */
    ) {
        throw new Error(
            spaceTrim(`
                Hook useStateInLocalstorage can not be used on the client side,
                please wrap the component with <NoSsr>...</NoSsr>

                Note: We can not return just simple initialState because that will cause an hydration mismatch error
                      in case that user has something saved in the local storage.
            `),
        );
    }

    const [isLoaded, setLoaded] = useState(false);
    const [state, setState] = useState<T>(initialState);

    useEffect(() => {
        const stateFromLocalStorage = window.localStorage.getItem(key);
        if (stateFromLocalStorage) {
            setState(stateFromLocalStorage as T);
        } else if (state !== initialState) {
            setState(initialState);
        }
        setLoaded(true);
    }, [key, initialState, state]);

    const persistState = (state: T) => {
        window.localStorage.setItem(key, state);
        setState(state);
    };

    return [state, persistState, isLoaded];
}

/**
 * TODO: Maybe use some library for storage - ask + [🧠] which one and which to use to sync with backend
 */
