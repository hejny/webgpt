import { Promisable } from 'type-fest';
import { UserInterfaceTools } from '../../../UserInterfaceTools';

/**
 * Delagates the user interaction to a async callback function
 * You need to provide your own implementation of this callback function and its bind to UI.
 */
export class CallbackInterfaceTools implements UserInterfaceTools {
    public constructor(private readonly callback: (prompt: string) => Promisable<string>) {}

    /**
     * Trigger the custom callback function
     */
    public async promptDialog(prompt: string): Promise<string> {
        return await this.callback(prompt);
    }
}
