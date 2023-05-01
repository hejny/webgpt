import { Color } from '../../../utils/color/Color';
import { loadAndRunExternalScript } from './loadAndRunExternalScript';

/**
 * @@@
 */
const HandwrittenStyle = {
    // TODO: !!! Name the styles
    Random: '-', // –
    FancyTall: 44,
    Fancy: 54, // 2
    Xxxxx3: 23, // 3
    Xxxxx4: 1, // 4
    Xxxxx5: 19, // 5
    Xxxxx6: 6, // 6
    Xxxxx7: 30, // 7
    Xxxxx8: 11, // 8
    Xxxxx9: 21, // 9
} as const;

/**
 * @@@
 */
interface IHandwriteTextOptions {
    text: string;
    color: Color;
    speed: number;
    bias: number;
    width: number;
    style: keyof typeof HandwrittenStyle;
    svgElement: SVGElement;
}

/**
 * @@@
 */
export async function handwriteText(options: IHandwriteTextOptions) {
    await loadAndRunExternalScript('/handwritten/script.js');
    await (window as any).handwriteText({
        ...options,
        color: options.color.toRgb(),
        style: HandwrittenStyle[options.style],
        modelSrc: '/handwritten/d.bin',
    }) /* <- !!! Return promise */;
}
