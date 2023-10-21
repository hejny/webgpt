/**
 * Represents all the tools needed to interact with the user.
 *
 * @see https://github.com/webgptorg/ptp#user-interface-tools
 */
export interface UserInterfaceTools {
    /**
     * Asks the user to answer a free-text (multiline) question
     *
     * @param prompt the question to ask
     * @returns the answer from the user
     */
    promptDialog(prompt: string): Promise<string>;
}
