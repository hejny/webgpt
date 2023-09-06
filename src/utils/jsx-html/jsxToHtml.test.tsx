import { describe, expect, it } from '@jest/globals';
import spaceTrim from 'spacetrim';
import { jsxToHtml } from './jsxToHtml';

describe('conversion of JSX to HTML', () => {
    it('converts simple html', () => {
        expect(jsxToHtml(<>foo</>)).toBe('foo');
        expect(jsxToHtml(<div>bar</div>)).toBe('<div>bar</div>');
    });

    it('converts html with multiple root nodes', () => {
        expect(
            jsxToHtml(
                <>
                    <div>foo</div>
                    <div>bar</div>
                </>,
            ),
        ).toBe(
            spaceTrim(`<div>foo</div><div>bar</div>
            `),
        );
    });

    it('converts deep strings', () => {
        expect(
            jsxToHtml(
                <>
                    deep <>foo</>
                </>,
            ),
        ).toBe('deep foo');
        expect(
            jsxToHtml(
                <div>
                    deep <span>bar</span>
                </div>,
            ),
        ).toBe('<div>deep <span>bar</span></div>');
    });

    it('will convert emptiness', () => {
        expect(jsxToHtml(<></>)).toBe('');
        expect(jsxToHtml(<div />)).toBe('<div></div>');
        expect(jsxToHtml(<div></div>)).toBe('<div></div>');
    });
});
