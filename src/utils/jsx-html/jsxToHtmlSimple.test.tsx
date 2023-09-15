import { describe, expect, it } from '@jest/globals';
import { jsxToHtmlSimple } from './jsxToHtmlSimple';

describe('conversion of JSX to simple HTML', () => {
    it('converts simple html', () => {
        expect(jsxToHtmlSimple(<>foo</>)).toBe('foo');
        expect(jsxToHtmlSimple(<div>bar</div>)).toBe('<div>bar</div>');
    });

    it('converts deep strings', () => {
        expect(
            jsxToHtmlSimple(
                <>
                    deep <>foo</>
                </>,
            ),
        ).toBe('deep foo');
        expect(
            jsxToHtmlSimple(
                <div>
                    deep <span>bar</span>
                </div>,
            ),
        ).toBe('<div>deep <span>bar</span></div>');
    });

    it('will convert emptiness', () => {
        expect(jsxToHtmlSimple(<></>)).toBe('');
        // TODO: What behaviour is better to return "<div/>" or "<div></div>"?
        expect(jsxToHtmlSimple(<div />)).toBe('<div/>');
        expect(jsxToHtmlSimple(<div></div>)).toBe('<div/>');
    });
});
