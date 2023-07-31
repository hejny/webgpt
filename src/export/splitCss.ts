import { string_css } from '../utils/typeAliases';

/**
 * @@@
 */
export function splitCss(cssString: string_css): string_css[] {
    const chunks: string[] = [];
    let currentChunk = '';
    let isInMediaQueryOrKeyframes = false;
    let isInRuleBlock = false;
    let braceCount = 0;
    let isInComment = false;

    for (let i = 0; i < cssString.length; i++) {
        const char = cssString[i];
        const nextChar = cssString[i + 1];
        const prevChar = cssString[i - 1];

        if (isInComment) {
            currentChunk += char;
            if (char === '*' && nextChar === '/') {
                isInComment = false;
                currentChunk += '/';
                i++; // Skip the '/' character
            }
        } else if (isInMediaQueryOrKeyframes) {
            currentChunk += char;
            if (char === '{') {
                braceCount++;
            } else if (char === '}') {
                braceCount--;
                if (braceCount === 0) {
                    isInMediaQueryOrKeyframes = false;
                    chunks.push(currentChunk.trim());
                    currentChunk = '';
                }
            }
        } else if (isInRuleBlock) {
            currentChunk += char;
            if (char === '}') {
                braceCount--;
                if (braceCount === 0) {
                    isInRuleBlock = false;
                    chunks.push(currentChunk.trim());
                    currentChunk = '';
                }
            }
        } else if (char === '@' && (nextChar === 'm' || nextChar === 'k')) {
            isInMediaQueryOrKeyframes = true;
            currentChunk += char;
        } else if (char === '{') {
            isInRuleBlock = true;
            currentChunk += char;
            braceCount++;
        } else if (char === ';' && !isInComment && prevChar !== '}') {
            chunks.push(currentChunk.trim() + ';');
            currentChunk = '';
        } else if (char === '/' && nextChar === '*') {
            isInComment = true;
            currentChunk += char;
        } else {
            currentChunk += char;
        }
    }

    if (currentChunk.trim() !== '') {
        chunks.push(currentChunk.trim());
    }

    return chunks;
}
