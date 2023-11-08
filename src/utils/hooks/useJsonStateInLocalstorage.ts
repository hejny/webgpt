import { useStateInLocalstorage } from './useStateInLocalstorage';

export function useJsonStateInLocalstorage<T extends object>(
    key: string,
    initialState: T,
): [state: T, setState: (newState: T) => void, isLoaded: boolean] {
    const [stateString, setStateString, isLoaded] = useStateInLocalstorage(key, JSON.stringify(initialState));
    return [JSON.parse(stateString) as T, (newState: T) => setStateString(JSON.stringify(newState)), isLoaded];
}

/**
 * TODO: Maybe use some library for storage - ask + [🧠] which one and which to use to sync with backend
 */
