import { MutableRefObject, useEffect, useRef, useState } from 'react';

export function useClickOutside(): {
    isOpen: boolean;
    buttonRef: MutableRefObject<HTMLDivElement | null>;
    windowRef: MutableRefObject<HTMLDivElement | null>;
} {
    const [isOpen, setOpen] = useState(false);
    const buttonRef = useRef<HTMLDivElement | null>(null);
    const windowRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const innerClickHandler = (event: Event) => {
            setOpen(!isOpen);
        };

        const innerElement = buttonRef.current;

        if (!innerElement) {
            return;
        }

        innerElement.addEventListener('click', innerClickHandler);
        return () => {
            innerElement.removeEventListener('click', innerClickHandler);
        };
    });

    useEffect(() => {
        const outerClickHandler = (event: Event) => {
            if (!windowRef.current || !buttonRef.current) {
                return;
            }
            if (buttonRef.current.contains(event.target as Node) || windowRef.current.contains(event.target as Node)) {
                return;
            }

            setOpen(false);
        };

        window.document.addEventListener('pointerdown', outerClickHandler);
        return () => {
            window.document.removeEventListener('pointerdown', outerClickHandler);
        };
    });

    return { isOpen, buttonRef: buttonRef, windowRef: windowRef };
}

/**
 * TODO: Figure out better name
 */
