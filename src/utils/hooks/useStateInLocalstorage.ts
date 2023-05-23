import { useState } from 'react';
import spaceTrim from 'spacetrim';

export function useStateInLocalstorage<T extends string>(key: string, initialState: T): [T, (likedStatus: T) => void] {
    if (
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

    const stateFromLocalStorage = localStorage.getItem(key);

    if (stateFromLocalStorage) {
        initialState = stateFromLocalStorage as T;
    }

    const [likedStatus, internalSetLikedStatus] = useState<T>(initialState);
    const setLikedStatus = (likedStatus: T) => {
        localStorage.setItem(key, likedStatus);
        internalSetLikedStatus(likedStatus);
    };

    return [likedStatus, setLikedStatus];
}
