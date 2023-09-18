import spaceTrim from 'spacetrim';

/**
 * Explains error in catch clause with extra message
 *
 * @param extraMessage
 * @returns nothing, it throws error with extra message
 */
export function explainError(extraMessage: string): (error: Error | unknown) => never {
    return (error: Error | unknown) => {
        if (!(error instanceof Error)) {
            throw error;
        }

        throw new Error(
            spaceTrim(
                (block) => `
                    ${block(extraMessage)}
                    
                    ${block(error.message)}
                `,
            ),
        );
    };
}
