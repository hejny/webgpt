import { describe, expect, it } from '@jest/globals';
import { isSubdomainOf } from './isSubdomainOf';

describe('isSubdomainOf', () => {
    it('is subdomain of', () => {
        expect(isSubdomainOf('prague.webgpt.cz', 'webgpt.cz')).toBe(true);
        expect(isSubdomainOf('brno.webgpt.cz', 'webgpt.cz')).toBe(true);
        expect(isSubdomainOf('webgpt.cz', 'cz')).toBe(true);
    });

    it('is NOT subdomain of', () => {
        expect(isSubdomainOf('webgpt.cz', 'webgpt.cz')).toBe(false);
        expect(isSubdomainOf('foo.google.cz', 'google.com')).toBe(false);
    });
});
