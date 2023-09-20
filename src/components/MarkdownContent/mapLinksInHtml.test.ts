import { describe, expect, it } from '@jest/globals';
import { spaceTrim } from 'spacetrim';
import { mapLinksInHtml } from './mapLinksInHtml';

describe('mapLinksInHtml', () => {
    it('should preserve html without links', () => {
        expect(
            mapLinksInHtml(
                spaceTrim(
                    `
                        Hello world!
                        <p>This is a <strong>html</strong> text.</p>
                    `,
                ),
                (oldHref) => oldHref + '-mapped',
            ),
        ).toBe(
            spaceTrim(
                `
                        Hello world!
                        <p>This is a <strong>html</strong> text.</p>
            `,
            ),
        );
    });

    it('should map link', () => {
        expect(
            mapLinksInHtml(
                spaceTrim(
                    `
                        <a href="original">link</a>
                    `,
                ),
                () => 'mapped',
            ),
        ).toBe(
            spaceTrim(
                `
                        <a href="mapped" data-original-href="original">link</a>
            `,
            ),
        );
    });

    it('should map links in multiple formats', () => {
        expect(mapLinksInHtml(`<a href="https://example.com/1">`, (oldHref) => oldHref + '-mapped')).toBe(
            `<a href="https://example.com/1-mapped" data-original-href="https://example.com/1">`,
        );
        expect(
            mapLinksInHtml(`<a href="https://example.com/1" target="_blank">`, (oldHref) => oldHref + '-mapped'),
        ).toBe(`<a href="https://example.com/1-mapped" data-original-href="https://example.com/1" target="_blank">`);

        expect(
            mapLinksInHtml(
                `<a href="https://example.com/1" target="_blank" class="aaaa">`,
                (oldHref) => oldHref + '-mapped',
            ),
        ).toBe(
            `<a href="https://example.com/1-mapped" data-original-href="https://example.com/1" target="_blank" class="aaaa">`,
        );

        expect(mapLinksInHtml(`<a href="https://example.com/1">`, (oldHref) => oldHref + '?foo=bar')).toBe(
            `<a href="https://example.com/1?foo=bar" data-original-href="https://example.com/1">`,
        );

        /*
        TODO: href can be second param, single quoted or new line before
        expect(mapLinksInHtml(`<a target="_blank" href="https://example.com/1">`, (oldHref) => oldHref + '-mapped')).toBe(
            `<a href="https://example.com/1-mapped">`,
        );
        */

        /*
        TODO: Escaping
        expect(mapLinksInHtml(`<a target="_blank" href="https://example.com/1">`, (oldHref) => oldHref + '?test="escaping"')).toBe(
            `<a href="https://example.com/1?test="escaping"">`,
        );
        */
    });

    it('should map multiple links', () => {
        expect(
            mapLinksInHtml(
                spaceTrim(
                    `
                        <a href="https://example.com/1">1</a>
                        <a href="https://example.com/2">2</a>
                        <a href="https://example.com/3">3</a>
                    `,
                ),
                (oldHref) => oldHref + '-mapped',
            ),
        ).toBe(
            spaceTrim(
                `
                        <a href="https://example.com/1-mapped" data-original-href="https://example.com/1">1</a>
                        <a href="https://example.com/2-mapped" data-original-href="https://example.com/2">2</a>
                        <a href="https://example.com/3-mapped" data-original-href="https://example.com/3">3</a>
            `,
            ),
        );
    });
});
