import { FakeClosePreventionSystem } from '../ClosePreventionSystem/FakeClosePreventionSystem';
import { IClosePreventionSystem } from '../ClosePreventionSystem/IClosePreventionSystem';
import { useSsrDetection } from './useSsrDetection';

/**
 * @@@
 *
 * @singleton
 */
let closePreventionSystem: IClosePreventionSystem;

export function useClosePreventionSystem(): IClosePreventionSystem {
    const isServerRender = useSsrDetection();

    if (isServerRender) {
        return new FakeClosePreventionSystem();
    }
    if (!closePreventionSystem) {
        closePreventionSystem = new FakeClosePreventionSystem();
    }

    return closePreventionSystem;
}
