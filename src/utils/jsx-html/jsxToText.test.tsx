import { describe, expect, it } from '@jest/globals';
import { jsxToText } from './jsxToText';

describe('conversion of JSX to text', () => {
    it('converts simple strings', () => {
        expect(jsxToText(<>foo</>)).toBe('foo');
        expect(jsxToText(<div>bar</div>)).toBe('bar');
    });

    it('converts deep strings', () => {
        expect(
            jsxToText(
                <>
                    deep <>foo</>
                </>,
            ),
        ).toBe('deep foo');
        expect(
            jsxToText(
                <div>
                    deep <span>bar</span>
                </div>,
            ),
        ).toBe('deep bar');
    });

    it('will convert emptiness', () => {
        expect(jsxToText(<></>)).toBe('');
        expect(jsxToText(<div />)).toBe('');
        expect(jsxToText(<div></div>)).toBe('');
    });
});
