import { describe, expect, it } from '@jest/globals';
import { checkDomain } from './checkDomain';

describe(`checkDomain`, () => {
    it(`checks 2nd level domains`, () => {
        expect(checkDomain(`webgpt.cz`)).resolves.toBe('REGISTERED');
        expect(checkDomain(`www.webgpt.cz`)).resolves.toBe('REGISTERED');
        expect(checkDomain(`google.com`)).resolves.toBe('REGISTERED');
        expect(checkDomain(`aehfsgysdfsadugfasdufy.com`)).resolves.toBe('AVAILABLE');
    });

    it(`checks 3rd level domains of our 2nd level domains`, () => {
        expect(checkDomain(`owls.webgpt.cz`)).resolves.toBe('REGISTERED');
        expect(checkDomain(`adasdasdasfasfasf.webgpt.cz`)).resolves.toBe('REGISTERED');
        expect(checkDomain(`owls.towns.cz`)).resolves.toBe('REGISTERED');
        expect(checkDomain(`adasdasdasfasfasf.towns.cz`)).resolves.toBe('REGISTERED');
        expect(checkDomain(`owls.1-2i.com`)).resolves.toBe('REGISTERED');
        expect(checkDomain(`adasdasdasfasfasf.1-2i.com`)).resolves.toBe('REGISTERED');
    });

    it(`does not checks 3rd level domains of unknown 2nd level domains`, () => {
        expect(checkDomain(`owls.pavolhejny.cz`)).resolves.toBe('UNKNOWN');
        expect(checkDomain(`adasdasdasfasfasf.google.com`)).resolves.toBe('UNKNOWN');
    });
});
