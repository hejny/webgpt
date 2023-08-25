import { describe, expect, it } from '@jest/globals';
import { removeQuotes } from './removeQuotes';

describe('removeQuotes', () => {
    it('should keep unquoted string', () => {
        expect(removeQuotes('Hello')).toEqual('Hello');
    });

    it('should remove single quotes', () => {
        expect(removeQuotes("'Hello'")).toEqual('Hello');
    });

    it('should remove double quotes', () => {
        expect(removeQuotes('"Hello"')).toEqual('Hello');
    });

    it('should NOT remove single quote from the beginning', () => {
        expect(removeQuotes("'Hello")).toEqual("'Hello");
        expect(removeQuotes('"Hello')).toEqual('"Hello');
    });

    it('should NOT remove single quote from the end', () => {
        expect(removeQuotes("Hello'")).toEqual("Hello'");
        expect(removeQuotes('Hello"')).toEqual('Hello"');
    });

    it('should NOT remove quote from the middle', () => {
        expect(removeQuotes("Hel'lo")).toEqual("Hel'lo");
        expect(removeQuotes('Hel"lo')).toEqual('Hel"lo');
    });
});
