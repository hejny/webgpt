import { IDestroyable } from 'destroyable';
import { IClosePreventable } from './IClosePreventable';

export interface IClosePreventionSystem extends IClosePreventable, IDestroyable /* TODO: Extends ISystem*/ {
    registerClosePrevention(...reasons: Array<IClosePreventable>): IDestroyable;
}
