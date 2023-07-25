import { describe, expect, it } from '@jest/globals';
import { blobToDataurl } from './blobToDataurl';

describe(`conversion of blob to dataurl`, () => {
    it(`converts blob to base64 encoded dataurl`, () => {
        expect(blobToDataurl(new Blob([`<h1>Hello, World!</h1>`], { type: 'text/html' }))).resolves.toBe(
            `data:text/html;base64,PGgxPkhlbGxvLCBXb3JsZCE8L2gxPg==`,
        );
    });
});
