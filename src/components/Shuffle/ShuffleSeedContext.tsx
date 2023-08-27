import { createContext } from 'react';


/**
 * Context for the seed of the random number generator used in the shuffling
 *
 * @param {ShuffleProps} props - The props for the component
 * @returns {ReactElement} - The shuffled children as a React element
 */

export const ShuffleSeedContext = createContext<string | number>('');
