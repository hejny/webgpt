import { describe, expect, it } from '@jest/globals';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { htmlToMaxdown } from './htmlToMaxdown';
import { maxdownToHtml } from './maxdownToHtml';
import { validateMaxdown } from './validateMaxdown';

// TODO: !!!! Test normalization of all samples

describe(`normalization of maxdowns`, () => {
    const markdowns = readdirSync(join(__dirname, 'samples'), { withFileTypes: true })
        .filter(({ name }) => name.endsWith('.md'))
        .map(({ name }) => ({ name, maxdownContent: readFileSync(join(__dirname, name), 'utf-8') }));

    console.log('!!!', markdowns.length);

    for (const { name, maxdownContent } of markdowns) {
        it(`should validate maxdown of ${name} sample`, () => {
            expect(() => validateMaxdown(maxdownContent)).not.toThrowError;
        });

        it(`should converts to html and back with ${name} sample`, () => {
            const htmlContent = maxdownToHtml(validateMaxdown(maxdownContent));
            const maxdownContentAgain = htmlToMaxdown(htmlContent);
            expect(htmlContent).toBe(maxdownContentAgain);
        });
    }
});
