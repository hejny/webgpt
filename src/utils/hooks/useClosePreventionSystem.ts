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
    const isRunningOnServer = useSsrDetection();

    if (isRunningOnServer) {
        return new FakeClosePreventionSystem();
    }
    if (!closePreventionSystem) {
        closePreventionSystem = new FakeClosePreventionSystem();
    }

    return closePreventionSystem;
}
