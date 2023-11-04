import { describe, expect, it } from '@jest/globals';
import { checkDomain } from './checkDomain';

describe(`checkDomain`, () => {
    it(`is valid`, () => {
        expect(checkDomain(`webgpt.cz`)).resolves.toBe('REGISTERED');
        expect(checkDomain(`www.webgpt.cz`)).resolves.toBe('REGISTERED');
        expect(checkDomain(`owl.animals.webgpt.cz`)).resolves.toBe('REGISTERED');
        expect(checkDomain(`google.com`)).resolves.toBe('REGISTERED');
        expect(checkDomain(`aehfsgysdfsadugfasdufy.webgpt.cz`)).resolves.toBe('AVAILABLE');
        expect(checkDomain(`aehfsgysdfsadugfasdufy.com`)).resolves.toBe('AVAILABLE');
    });
});
