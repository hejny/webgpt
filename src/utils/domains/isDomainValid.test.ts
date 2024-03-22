import { describe, expect, it } from '@jest/globals';
import { isDomainValid } from './isDomainValid';
//import { isValidDomain } from './isValidDomain';

describe(`validation of domains`, () => {
    it(`is valid`, () => {
        expect(isDomainValid(`webgpt.cz`)).toBe(true);
        expect(isDomainValid(`www.webgpt.cz`)).toBe(true);
        expect(isDomainValid(`owl.animals.webgpt.cz`)).toBe(true);
        expect(isDomainValid(`google.com`)).toBe(true);
        expect(isDomainValid(`test.1-2i.com`)).toBe(true);
        expect(isDomainValid(`test.xxx.com`)).toBe(true);
    });

    it(`is NOT valid`, () => {
        expect(isDomainValid(`localhost`)).toBe(false);
        expect(isDomainValid(`webgpt.cz/path`)).toBe(false);
        expect(isDomainValid(`webgpt.cz:80`)).toBe(false);
        expect(isDomainValid(`http://webgpt.cz/`)).toBe(false);
        expect(isDomainValid(`129.56.3.55`)).toBe(false);
        expect(isDomainValid(``)).toBe(false);
        expect(isDomainValid(`1`)).toBe(false);
        expect(isDomainValid(`1.A`)).toBe(false);
        expect(isDomainValid(`---`)).toBe(false);
        expect(isDomainValid(`@`)).toBe(false);
        expect(isDomainValid(`@@@`)).toBe(false);
        expect(isDomainValid(`@hejny`)).toBe(false);
        // expect(isValidDomain(`example.com`)).toBe(false);
    });
});
