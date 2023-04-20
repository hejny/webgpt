import { describe, expect, it } from '@jest/globals';
import { normalizeWhitespaces } from 'n12';
import { wrapSvgInHtml } from './wrapSvgInHtml';

describe('wrapSvgInHtml', () => {
    it('will wrap svg in html without xml declaration', () => {
        expect(
            normalizeWhitespaces(
                wrapSvgInHtml(`
                    <svg viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="50" fill="red" />
                    </svg>
                `),
            ),
        ).toBe(
            normalizeWhitespaces(`
                    <html>
                        <head>
                        </head>
                        <body>
                            <svg viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="50" fill="red" />
                            </svg>
                        </body>
                    </html>
            `),
        );
    });

    it('will wrap svg in html with xml declaration', () => {
        expect(
            normalizeWhitespaces(
                wrapSvgInHtml(`
                    <?xml version="1.0" encoding="UTF-8" standalone="no"?>
                    <svg viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="50" fill="red" />
                    </svg>
                `),
            ),
        ).toBe(
            normalizeWhitespaces(`
                    <html>
                        <head>
                        </head>
                        <body>
                            <!--<?xml version="1.0" encoding="UTF-8" standalone="no"?>-->
                            <svg viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="50" fill="red" />
                            </svg>
                        </body>
                    </html>
            `),
        );
    });
});
