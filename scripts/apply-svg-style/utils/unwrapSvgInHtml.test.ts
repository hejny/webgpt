import { describe, expect, it } from '@jest/globals';
import { normalizeWhitespaces } from 'n12';
import { unwrapSvgInHtml } from './unwrapSvgInHtml';

describe('unwrapSvgInHtml', () => {
    it('should extract the SVG string from wrapped HTML without an XML declaration', () => {
        const input = `
            <html>
            <head>
            </head>
            <body>
                <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="50" fill="red" />
                </svg>
            </body>
            </html>
        `;
        const expected = `
            <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" fill="red" />
            </svg>
        `;
        expect(normalizeWhitespaces(unwrapSvgInHtml(input))).toBe(normalizeWhitespaces(expected));
    });

    it('should extract the SVG string from wrapped HTML with an XML declaration', () => {
        const input = `
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
        `;
        const expected = `
            <?xml version="1.0" encoding="UTF-8" standalone="no"?>
            <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" fill="red" />
            </svg>
        `;
        expect(normalizeWhitespaces(unwrapSvgInHtml(input))).toBe(normalizeWhitespaces(expected));
    });

    it('should extract the SVG string from wrapped HTML with whitespace', () => {
        const input = `
            <html>
            <head>
            </head>
            <body>
                <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="50" fill="red" />
                </svg>
            </body>
            </html>
        `;
        const expected = `
            <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" fill="red" />
            </svg>
      `;
        expect(normalizeWhitespaces(unwrapSvgInHtml(input))).toBe(normalizeWhitespaces(expected));
    });

    it('should handle an invalid input without throwing an error', () => {
        const input = 'invalid input';
        expect(() => unwrapSvgInHtml(input)).toThrowError();
    });
});
