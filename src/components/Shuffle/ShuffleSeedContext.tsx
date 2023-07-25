import { createContext } from 'react';

/**
 * A function component that shuffles its children based on a seed and a limit ⁘
 *
 * @param {ShuffleProps} props - The props for the component
 * @returns {ReactElement} - The shuffled children as a React element
 */

export const ShuffleSeedContext = createContext<string | number>('');
