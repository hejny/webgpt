import { useState } from 'react';

/**
 * React hook that toggles between true and false
 *
 */
export function useToggle(initialState: boolean): [isToggled: boolean, toggle: () => void] {
    const [isToggled, setToggled] = useState<boolean>(initialState);
    return [isToggled, () => void setToggled(!isToggled)];
}
