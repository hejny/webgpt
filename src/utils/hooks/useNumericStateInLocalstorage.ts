import { useStateInLocalstorage } from './useStateInLocalstorage';

export function useNumericStateInLocalstorage(
    key: string,
    initialState: number,
): [state: number, setState: (newState: number) => void, isLoaded: boolean] {
    const [stateSerialized, setStateSerialized, isLoaded] = useStateInLocalstorage(key, initialState.toString());

    const state = parseInt(stateSerialized, 10);
    const setState = (newState: number) => {
        setStateSerialized(newState.toString());
    };

    return [state, setState, isLoaded];
}
