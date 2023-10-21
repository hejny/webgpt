import { describe, expect, it } from '@jest/globals';
import spaceTrim from 'spacetrim';
import { JavascriptEvalExecutionTools } from './JavascriptEvalExecutionTools';

describe('JavascriptEvalExecutionTools', () => {
    const javascriptEvalExecutionTools = new JavascriptEvalExecutionTools();

    it('should evaluate simple script', () => {
        expect(
            javascriptEvalExecutionTools.execute({
                scriptLanguage: 'javascript',
                parameters: {
                    animal: 'cat',
                },
                script: spaceTrim(`
                    animal
                `),
            }),
        ).resolves.toEqual('cat');
    });

    it('should fail on python script', () => {
        expect(
            javascriptEvalExecutionTools.execute({
                scriptLanguage: 'python',
                parameters: {
                    animal: 'cat',
                },
                script: spaceTrim(`
                    print(animal);
                `),
            }),
        ).rejects.toThrowError(/not supported/);
    });
});

/**
 * TODO: !! Make shared test between JavascriptEvalExecutionTools and JavascriptExecutionTools to test the same functionality when implemented via vm2
 */
