import { describe, expect, it } from '@jest/globals';
import { linkMarkdown } from './linkMarkdown';

describe('linkMarkdown', () => {
    it(`keeps linkless text`, () => {
        expect(linkMarkdown(`foo bar`)).toBe(`foo bar`);
    });

    it(`add one link`, () => {
        expect(linkMarkdown(`look at H-edu`)).toBe(`look at [H-edu](https://h-edu.cz)`);
    });

    it(`add multiple links`, () => {
        expect(linkMarkdown(`look at H-edu and Collboard`)).toBe(
            `look at [H-edu](https://h-edu.cz) and [Collboard](https://collboard.com)`,
        );
    });

    it(`add multiple links`, () => {
        expect(linkMarkdown(`look at H-edu and Collboard`)).toBe(
            `look at [H-edu](https://h-edu.cz) and [Collboard](https://collboard.com)`,
        );
    });

    it(`works with inflection`, () => {
        expect(linkMarkdown(`Česká společnost ornitologická bez České společnosti ornitologické`)).toBe(
            `[Česká společnost ornitologická](https://www.birdlife.cz/) bez [České společnosti ornitologické](https://www.birdlife.cz/)`,
        );
        expect(linkMarkdown(`Startup Weekend bez Startup Weekendu`)).toBe(
            `[Startup Weekend](https://startovani.cz/) bez [Startup Weekendu](https://startovani.cz/)`,
        );
    });

    it(`will activate acronyms`, () => {
        expect(linkMarkdown(`VR/AR`)).toBe(`[VR/AR](/technologies/vr-ar)`);
        expect(linkMarkdown(`AI`)).toBe(`[AI](/technologies/ai)`);
        expect(linkMarkdown(`Blockchain`)).toBe(`[Blockchain](/technologies/blockchain)`);
    });
});
