import { describe, expect, it } from '@jest/globals';
import spaceTrim from 'spacetrim';
import { removeSourceMaps } from './removeSourceMaps';

describe('removeSourceMaps', () => {
    it(`keeps javascript as it is`, () => {
        expect(
            spaceTrim(
                removeSourceMaps(`
                    console.log('Hello world');
                `),
            ),
        ).toEqual(
            spaceTrim(
                removeSourceMaps(`
                    console.log('Hello world');
                `),
            ),
        );
    });

    it(`remove source map from css`, () => {
        expect(
            spaceTrim(
                removeSourceMaps(`
                    .test {
                        color: red;
                    }

                    /*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2andLoootMore */
                    
                `),
            ),
        ).toEqual(
            spaceTrim(
                removeSourceMaps(`
                    .test {
                        color: red;
                    }

                `),
            ),
        );
    });

    it(`remove source map from javascript`, () => {
        expect(
            spaceTrim(
                removeSourceMaps(`
                    console.log('Hello world');

                    /*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2andLoootMore */

                `),
            ),
        ).toEqual(
            spaceTrim(
                removeSourceMaps(`
                    console.log('Hello world');
                `),
            ),
        );
    });
});
