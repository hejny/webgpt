import { Destroyable, Registration } from 'destroyable';
import { IClosePreventable } from './IClosePreventable';
import { IClosePreventionSystem } from './IClosePreventionSystem';
/**
 * FakeClosePreventionSystem is a implementation of IClosePreventionSystem which implements the interface but does nothing
 *
 * @collboard-modules-sdk
 */
export class FakeClosePreventionSystem extends Destroyable implements IClosePreventionSystem {
    public registerClosePrevention(...reasons: Array<IClosePreventable>): Registration {
        return Registration.void();
    }

    public get canBeClosed(): boolean {
        return true;
    }
}
