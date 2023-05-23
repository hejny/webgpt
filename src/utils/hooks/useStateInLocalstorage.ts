import { useState } from 'react';

export function useStateInLocalstorage<T extends string>(key: string, initialState: T): [T, (likedStatus: T) => void] {
    if (typeof window !== 'undefined') {
        const stateFromLocalStorage = localStorage.getItem(key);

        if (stateFromLocalStorage) {
            initialState = stateFromLocalStorage as T;
        }
    }

    const [likedStatus, internalSetLikedStatus] = useState<T>(initialState);
    const setLikedStatus = (likedStatus: T) => {
        localStorage.setItem(key, likedStatus);
        internalSetLikedStatus(likedStatus);
    };

    return [likedStatus, setLikedStatus];
}
