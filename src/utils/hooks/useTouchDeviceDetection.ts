import { useEffect, useState } from 'react';

/**
 * Detects if the device is a touch device
 *
 * Note: On SSR, this will always return false
 */
export function useTouchDeviceDetection(): boolean {
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const isTouchDevice =
            'ontouchstart' in window || navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0;
        setIsTouchDevice(isTouchDevice);
    }, []);

    return isTouchDevice;
}
