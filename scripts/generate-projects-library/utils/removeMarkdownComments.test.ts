import { describe, expect, it } from '@jest/globals';
import { removeMarkdownComments } from './removeMarkdownComments';

describe('removeMarkdownComments removes markdown comments', () => {
    it('will remove markdown comments', () => {
        const input = 'This is a <!-- comment --> test';
        const output = removeMarkdownComments(input);
        expect(output).toBe('This is a  test');
    });
});
