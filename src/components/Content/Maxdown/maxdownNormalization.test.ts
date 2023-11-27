import { describe, expect, it } from '@jest/globals';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { htmlToMaxdown } from './htmlToMaxdown';
import { maxdownToHtml } from './maxdownToHtml';
import { validateMaxdown } from './validateMaxdown';

describe(`normalization of maxdowns`, () => {
    const markdowns = readdirSync(join(__dirname, 'samples'), { withFileTypes: true })
        //                       <- Note: In production it is not good practice to use synchronous functions
        //                                But this is only a test before the build, so it is okay
        .filter(({ name }) => name.endsWith('.md'))
        .map(({ name }) => ({ name, maxdownContent: readFileSync(join(__dirname, 'samples', name), 'utf-8') }));

    for (const { name, maxdownContent } of markdowns) {
        it(`should validate maxdown of ${name} sample`, () => {
            expect(() => validateMaxdown(maxdownContent)).not.toThrowError;
        });

        it(`should converts to html and back with ${name} sample`, () => {
            const htmlContent = maxdownToHtml(validateMaxdown(maxdownContent));

            /*/
            //Note: It is useful to save the html for manual inspection
            writeFileSync(join(__dirname, 'samples', name.split('.md').join('.html')), htmlContent, 'utf-8');
            /**/

            const maxdownContentAgain = htmlToMaxdown(htmlContent);

            /**/
            //Note: It is useful to save normalized markdown for manual inspection
            writeFileSync(join(__dirname, 'samples', name), maxdownContentAgain, 'utf-8');
            /**/

            expect(htmlContent).toBe(maxdownContentAgain);
        });
    }
});

// Note: Preserve imports for the test
writeFileSync;
