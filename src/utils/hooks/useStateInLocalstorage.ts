import { useEffect, useState } from 'react';
import spaceTrim from 'spacetrim';

// !!! useStateInLocalstorage does not know about likedStatus
// !!! Save also date of liking
// !!! Maybe use some library for storage - ask + [🧠] which one and which to use to sync with backend

export function useStateInLocalstorage<T extends string>(key: string, initialState: T): [T, (likedStatus: T) => void] {
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
                This hook can not be used on the client side,
                please wrap the component with <NoSsr>...</NoSsr>

                Note: We can not return just simple initialState because that will cause an hydration mismatch error
                      in case that user has something saved in the local storage.
            `),
        );
    }

    const [likedStatus, setLikedStatus] = useState<T>(initialState);

    useEffect(() => {
        const stateFromLocalStorage = window.localStorage.getItem(key);
        if (stateFromLocalStorage) {
            setLikedStatus(stateFromLocalStorage as T);
        } else if (likedStatus !== initialState) {
            setLikedStatus(initialState);
        }
    }, [key, initialState, likedStatus]);

    const persistLikedStatus = (likedStatus: T) => {
        window.localStorage.setItem(key, likedStatus);
        setLikedStatus(likedStatus);
    };

    return [likedStatus, persistLikedStatus];
}
