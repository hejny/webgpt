import { describe, expect, it } from '@jest/globals';
import { isPrivateNetwork } from './isPrivateNetwork';

describe('isPrivateNetwork', () => {
    it('isPrivateNetwork returns false for local hostnames', () => {
        expect(isPrivateNetwork('localhost')).toBe(true);
        expect(isPrivateNetwork('a.localhost')).toBe(true);
        expect(isPrivateNetwork('foo.a.localhost')).toBe(true);
    });

    it('isPrivateNetwork returns false for public hostnames', () => {
        expect(isPrivateNetwork('collboard.com')).toBe(false);
        expect(isPrivateNetwork('collboard.localhost.com')).toBe(false);
        expect(isPrivateNetwork('localhost.false')).toBe(false);
        expect(isPrivateNetwork('foo.com')).toBe(false);
    });

    it('isPrivateNetwork returns true for private IP addresses', () => {
        expect(isPrivateNetwork('192.168.0.1')).toBe(true);
        expect(isPrivateNetwork('10.0.0.1')).toBe(true);
        expect(isPrivateNetwork('172.16.0.1')).toBe(true);
        expect(isPrivateNetwork('127.0.0.1')).toBe(true);
        expect(isPrivateNetwork('::1')).toBe(true);
    });

    it('isPrivateNetwork returns false for public IP addresses', () => {
        expect(isPrivateNetwork('8.8.8.8')).toBe(false);
        expect(isPrivateNetwork('1.1.1.1')).toBe(false);
    });
});
