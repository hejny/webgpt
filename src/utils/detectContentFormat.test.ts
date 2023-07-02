import { describe, expect } from '@jest/globals';
import { detectContentFormat } from './detectContentFormat';

describe('detectContentFormat', () => {
    test('should return html for valid HTML content', () => {
        const htmlContent = '<p>Hello, this is Bing.</p>';
        expect(detectContentFormat(htmlContent)).toBe('html');
    });

    test('should return markdown for valid markdown content', () => {
        const markdownContent = '# Hello, this is Bing.\n\nThis is a *markdown* document.';
        expect(detectContentFormat(markdownContent)).toBe('markdown');
    });

    test('should return markdown for plain text content', () => {
        const plainTextContent = 'Hello, this is Bing.';
        expect(detectContentFormat(plainTextContent)).toBe('markdown');
    });
});
