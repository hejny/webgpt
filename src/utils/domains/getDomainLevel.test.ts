import { describe, expect, it } from '@jest/globals';
import { getDomainLevel } from './getDomainLevel';

describe('how getDomainLevel works', () => {
    it('should tell the level for given domain', () => {
        expect(getDomainLevel('cz')).toBe(1);
        expect(getDomainLevel('hejny.org')).toBe(2);
        expect(getDomainLevel('pavolhejny.cz')).toBe(2);
        expect(getDomainLevel('pavolhejny.com')).toBe(2);
        expect(getDomainLevel('towns.cz')).toBe(2);
        expect(getDomainLevel('www.webgpt.cz')).toBe(3);
    });
});
