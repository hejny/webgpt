import { describe, expect, it } from '@jest/globals';
import { getDomainTdl } from './getDomainTdl';

describe('how getDomainTdl works', () => {
    it('should tell the tdl of the domain', () => {
        expect(getDomainTdl('webgpt.cz')).toBe('cz');
        expect(getDomainTdl('hejny.org')).toBe('org');
        expect(getDomainTdl('pavolhejny.cz')).toBe('cz');
        expect(getDomainTdl('pavolhejny.com')).toBe('com');
        expect(getDomainTdl('towns.cz')).toBe('cz');
    });
});
