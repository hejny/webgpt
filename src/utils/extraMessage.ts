import spaceTrim from 'spacetrim';

// !!! Annotate

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
