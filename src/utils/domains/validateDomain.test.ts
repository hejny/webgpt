import { describe, expect, it } from '@jest/globals';
import { validateDomain } from './validateDomain';
//import { isValidDomain } from './isValidDomain';

describe(`validateDomain`, () => {
    it(`is valid`, () => {
        expect(validateDomain(`webgpt.cz`)).toBe(`webgpt.cz`);
        expect(validateDomain(`www.webgpt.cz`)).toBe(`www.webgpt.cz`);
        expect(validateDomain(`owl.animals.webgpt.cz`)).toBe(`owl.animals.webgpt.cz`);
        expect(validateDomain(`google.com`)).toBe(`google.com`);
        expect(validateDomain(`test.1-2i.com`)).toBe(`test.1-2i.com`);
        expect(validateDomain(`test.xxx.com`)).toBe(`test.xxx.com`);
    });

    it(`is NOT valid`, () => {
        expect(validateDomain(`localhost`)).toThrowError(`Invalid domain`);
        expect(validateDomain(`webgpt.cz/path`)).toThrowError(`Invalid domain`);
        expect(validateDomain(`webgpt.cz:80`)).toThrowError(`Invalid domain`);
        expect(validateDomain(`http://webgpt.cz/`)).toThrowError(`Invalid domain`);
        expect(validateDomain(`129.56.3.55`)).toThrowError(`Invalid domain`);
        expect(validateDomain(``)).toThrowError(`Invalid domain`);
        expect(validateDomain(`1`)).toThrowError(`Invalid domain`);
        expect(validateDomain(`1.A`)).toThrowError(`Invalid domain`);
        expect(validateDomain(`---`)).toThrowError(`Invalid domain`);
        expect(validateDomain(`@`)).toThrowError(`Invalid domain`);
        expect(validateDomain(`@@@`)).toThrowError(`Invalid domain`);
        expect(validateDomain(`@hejny`)).toThrowError(`Invalid domain`);
    });
});
