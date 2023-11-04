import { describe, expect, it } from '@jest/globals';
import { lookupDomain } from './lookupDomain';

describe(`lookupDomain`, () => {
    it(`is valid`, () => {
        expect(lookupDomain(`webgpt.cz`)).resolves.toBe({});
        expect(lookupDomain(`webgpt.com`)).resolves.toBe({});
        expect(lookupDomain(`google.com`)).resolves.toBe({});
        expect(lookupDomain(`towns.cz`)).resolves.toBe({});
        expect(lookupDomain(`svetlodat.eu`)).resolves.toBe({});
        expect(lookupDomain(`sdgfsdfgsdgdgsdfgd.com`)).resolves.toBe({});
        expect(lookupDomain(`sdgfsdfgsdgdgsdfgd.cz`)).resolves.toBe({});
        expect(lookupDomain(`sdgfsdfgsdgdgsdfgd.eu`)).resolves.toBe({});
        expect(lookupDomain(`sdgfsdfgsdgdgsdfgd.org`)).resolves.toBe({});
    });
});
