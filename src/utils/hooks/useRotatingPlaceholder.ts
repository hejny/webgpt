import { useEffect, useState } from 'react';

const PLACEHOLDER_CHARACTERS_PER_SECOND = 50;
const PLACEHOLDER_WAIT_AFTER_FINISH_SECONDS = 10;

/**
 * Hook for getting rotating placeholder for an input or textarea
 * It will rotate through all provided placeholders and apply writing effect to them
 */
export function useRotatingPlaceholder(...placeholders: Array<string>): string {
    if (placeholders.length === 0) {
        throw new Error('You must provide at least one placeholder');
    }

    const [placeholder, setPlacehoders] = useState('');
    const [index, setIndex] = useState(0);
    const [cursor, setCursor] = useState(0);

    useEffect(
        () => {
            const interval = setInterval(() => {
                setCursor((cursor) => cursor + 1);

                if (
                    cursor >=
                    placeholders[index]!.length +
                        PLACEHOLDER_WAIT_AFTER_FINISH_SECONDS * PLACEHOLDER_CHARACTERS_PER_SECOND
                ) {
                    setCursor(0);
                    setIndex((index) => (index + 1) % placeholders.length);
                }

                setPlacehoders(placeholders[index]!.slice(0, cursor));
            }, 1000 / PLACEHOLDER_CHARACTERS_PER_SECOND);

            return () => {
                clearInterval(interval);
            };
        },
        // Note: Effect is really dependent ONLY on placeholders, we don't want to recreate it every time
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [placeholders],
    );

    return placeholder;
}
