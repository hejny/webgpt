import { describe, expect, it } from '@jest/globals';
import { string_domain } from '../typeAliases';
import { isValidDomain } from './isValidDomain';
//import { isValidDomain } from './isValidDomain';

describe(`validation of domains`, () => {
    it(`is valid`, () => {
        expect(isValidDomain(`webgpt.cz`)).toBe(true);
        expect(isValidDomain(`www.webgpt.cz`)).toBe(true);
        expect(isValidDomain(`owl.animals.webgpt.cz`)).toBe(true);
        expect(isValidDomain(`google.com`)).toBe(true);
    });

    it(`is NOT valid`, () => {
        expect(isValidDomain(`localhost`)).toBe(false);
        expect(isValidDomain(`webgpt.cz/path`)).toBe(false);
        expect(isValidDomain(`webgpt.cz:80`)).toBe(false);
        expect(isValidDomain(`http://webgpt.cz/`)).toBe(false);
        expect(isValidDomain(`129.56.3.55`)).toBe(false);
        expect(isValidDomain(``)).toBe(false);
        expect(isValidDomain(`1`)).toBe(false);
        expect(isValidDomain(`1.A`)).toBe(false);
        expect(isValidDomain(`---`)).toBe(false);
        expect(isValidDomain(`@`)).toBe(false);
        expect(isValidDomain(`@@@`)).toBe(false);
        expect(isValidDomain(`@hejny`)).toBe(false);
        // expect(isValidDomain(`example.com`)).toBe(false);
    });
});

