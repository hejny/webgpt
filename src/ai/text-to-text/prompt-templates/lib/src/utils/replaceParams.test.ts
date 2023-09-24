import { describe, expect, it } from '@jest/globals';
import spaceTrim from 'spacetrim';
import { just } from '../../../../../../utils/just';
import { replaceParams } from './replaceParams';

describe('replaceParams', () => {
    it('should work in supersimple case', () => {
        expect(replaceParams('', {})).toBe('');
    });

    it('should keep template without params as it is', () => {
        expect(replaceParams('Hello', {})).toBe('Hello');
        expect(replaceParams('Hello world', {})).toBe('Hello world');
    });

    it('should replace param at the end', () => {
        expect(replaceParams('Hello {name}', { name: 'world' })).toBe('Hello world');
    });

    it('should replace param in the middle', () => {
        expect(replaceParams('Hello {name}, how are you?', { name: 'world' })).toBe('Hello world, how are you?');
    });

    it('should replace param at the beginning', () => {
        expect(replaceParams('{name}, how are you?', { name: 'world' })).toBe('world, how are you?');
    });

    it('should replace multiple params', () => {
        expect(replaceParams('{greeting} {name}, how are you?', { greeting: 'Hello', name: 'world' })).toBe(
            'Hello world, how are you?',
        );
    });

    it('should replace same param multiple times', () => {
        expect(
            replaceParams('{greeting} {name}, how are you? {greeting} {name}', { greeting: 'Hello', name: 'world' }),
        ).toBe('Hello world, how are you? Hello world');
    });

    it('should replace multiline templates', () => {
        expect(
            replaceParams(
                spaceTrim(`
                    Hello {name}, how are you?
                    I am {greeting}
                `),
                { greeting: 'fine', name: 'world' },
            ),
        ).toBe(
            just(
                spaceTrim(`
                    Hello world, how are you?
                    I am fine
                `),
            ),
        );
    });

    it('should throw error when param is not defined', () => {
        expect(() => replaceParams('{greeting} {name}, how are you?', { greeting: 'Hello' })).toThrowError(
            'Param "name" is not defined',
        );
    });

    it('should throw error when param is not closed', () => {
        expect(() => replaceParams('Hello {name', { name: 'world' })).toThrowError();
    });

    it('should throw error when param is not opened', () => {
        expect(() =>
            replaceParams('greeting} {name}, how are you?', { greeting: 'Hello', name: 'world' }),
        ).toThrowError();
    });

    it('should throw error when param is embeded in another param', () => {
        expect(() =>
            replaceParams('{greeting {name}}, how are you?', { greeting: 'Hello', name: 'world' }),
        ).toThrowError();
    });
});
