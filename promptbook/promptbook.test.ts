import { describe, expect, it } from '@jest/globals';
import { PromptTemplatePipeline, promptTemplatePipelineStringToJson } from '@promptbook/core';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

function checkPtbkSource(source: unknown) {
    return () => {
        const ptbkJson = promptTemplatePipelineStringToJson(source as any /* <- TODO: Remove any */);
        PromptTemplatePipeline.fromJson(ptbkJson);
    };
}

describe(`promptbook of WebGPT`, () => {
    const ptbkSources = readdirSync(__dirname, { withFileTypes: true })
        //                         <- Note: In production it is not good practice to use synchronous functions
        //                                  But this is only a test before the build, so it is okay
        .filter(({ name }) => name.endsWith('.ptbk.md'))
        .map(({ name }) => ({ name, content: readFileSync(join(__dirname, name), 'utf-8') }));

    for (const { name, content } of ptbkSources) {
        it(`should parse a valid ${name}`, () => {
            expect(checkPtbkSource(content)).not.toThrow();
        });
    }

    it(`fail to parse an invalid mocked source`, () => {
        expect(checkPtbkSource(`Invalid source`)).toThrowError();
    });
});
