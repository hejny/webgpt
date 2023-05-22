import { Destroyable, IDestroyable, registerItemsInArray, Registration } from 'destroyable';
import { IClosePreventable } from './IClosePreventable';
import { IClosePreventionSystem } from './IClosePreventionSystem';
/**
 * @collboard-system
 */
export class ClosePreventionSystem
    extends Destroyable
    implements IClosePreventionSystem, IClosePreventable, IDestroyable
{
    constructor() {
        super();
        /* not await */ this.init();
    }

    protected async init() {
        // TODO: Cleanup when destroying
        window.onbeforeunload = this.beforeunloadHandler.bind(this);
        // Note: It is not working by window.addEventListener('beforeunload', this.beforeunloadHandler);

        /*/

        // Note: Keep for debugging

        (async () => {
            while (true) {
                await forTime(200);
                console.info(this.canBeClosed);
            }
        })();
        /* */
    }

    private reasons: Array<IClosePreventable> = [];

    public registerClosePrevention(...reasons: Array<IClosePreventable>): Registration {
        console.log('registerClosePrevention');
        return registerItemsInArray({ base: this.reasons, add: reasons });
    }

    public get canBeClosed(): boolean {
        return !this.reasons.some((object) => !object.canBeClosed);
    }

    private beforeunloadHandler(event: BeforeUnloadEvent) {
        if (this.canBeClosed) {
            return undefined;
        } else {
            return ' ' /* Note: There is no way how to pass own message in todays browsers */;
        }
    }
}
