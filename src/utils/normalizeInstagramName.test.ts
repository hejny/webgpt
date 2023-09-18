import { describe, expect, it } from '@jest/globals';
import { normalizeInstagramName } from './normalizeInstagramName';

describe('normalizeInstagramName', () => {
    it(`keeps already normalized handle`, () => {
        expect(normalizeInstagramName(`_1_2i_`)).toBe(`_1_2i_`);
        expect(normalizeInstagramName(`pavolhejny`)).toBe(`pavolhejny`);
        expect(normalizeInstagramName(`michelangelato.zmrzlinarna`)).toBe(`michelangelato.zmrzlinarna`);
    });

    it(`normalizes name with @ prefix`, () => {
        expect(normalizeInstagramName(`@_1_2i_`)).toBe(`_1_2i_`);
        expect(normalizeInstagramName(`@pavolhejny`)).toBe(`pavolhejny`);
        expect(normalizeInstagramName(`@michelangelato.zmrzlinarna`)).toBe(`michelangelato.zmrzlinarna`);
    });

    it(`normalizes name as simple URL`, () => {
        expect(normalizeInstagramName(`https://www.instagram.com/_1_2i_`)).toBe(`_1_2i_`);
        expect(normalizeInstagramName(`https://www.instagram.com/pavolhejny`)).toBe(`pavolhejny`);
        expect(normalizeInstagramName(`https://www.instagram.com/michelangelato.zmrzlinarna`)).toBe(
            `michelangelato.zmrzlinarna`,
        );
    });

    it(`normalizes name as URL with ending slash`, () => {
        expect(normalizeInstagramName(`https://www.instagram.com/_1_2i_/`)).toBe(`_1_2i_`);
        expect(normalizeInstagramName(`https://www.instagram.com/pavolhejny/`)).toBe(`pavolhejny`);
        expect(normalizeInstagramName(`https://www.instagram.com/michelangelato.zmrzlinarna/`)).toBe(
            `michelangelato.zmrzlinarna`,
        );
    });

    it(`normalizes name as URL with clutter`, () => {
        expect(
            normalizeInstagramName(
                `https://www.instagram.com/_1_2i_?stp=dst-jpg_e35_s640x640_sh0.08&_nc_ht=instagram.fbrq1-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=CWYyiyqCEpIAX_LGq3x&edm=AKEQFekBAAAA&ccb=7-5&oh=00_AfAvAPcKqWr6PoJzEmaC3YA6NU5koh78stPGKcinTiNVIQ&oe=650C5393&_nc_sid=29ddf3`,
            ),
        ).toBe(`_1_2i_`);
        expect(
            normalizeInstagramName(
                `https://www.instagram.com/pavolhejny?stp=dst-jpg_e35_s640x640_sh0.08&_nc_ht=instagram.fbrq1-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=CWYyiyqCEpIAX_LGq3x&edm=AKEQFekBAAAA&ccb=7-5&oh=00_AfAvAPcKqWr6PoJzEmaC3YA6NU5koh78stPGKcinTiNVIQ&oe=650C5393&_nc_sid=29ddf3`,
            ),
        ).toBe(`pavolhejny`);
        expect(
            normalizeInstagramName(
                `https://www.instagram.com/michelangelato.zmrzlinarna?stp=dst-jpg_e35_s640x640_sh0.08&_nc_ht=instagram.fbrq1-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=CWYyiyqCEpIAX_LGq3x&edm=AKEQFekBAAAA&ccb=7-5&oh=00_AfAvAPcKqWr6PoJzEmaC3YA6NU5koh78stPGKcinTiNVIQ&oe=650C5393&_nc_sid=29ddf3`,
            ),
        ).toBe(`michelangelato.zmrzlinarna`);
    });
});
