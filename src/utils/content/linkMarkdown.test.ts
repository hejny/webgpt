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
        expect(linkMarkdown(`Pavol Hejný s Tomášem Studeníkem`)).toBe(
            `[Pavol Hejný](https://www.pavolhejny.com) s [Tomášem Studeníkem](https://www.tomas-studenik.com)`,
        );
    });
});
