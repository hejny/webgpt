import { Color } from '../../../utils/color/Color';
import { loadAndRunExternalScript } from './loadAndRunExternalScript';

/**
 * An object that maps different styles of handwriting to their corresponding codes ⁘
 * 
 * @type {Object}
 */
const HandwrittenStyle = {
    // TODO: !!! extract to properties or flags - italic, Fancy, joined + italic vs cursive 
    Random: '-', // –
    FancyTall: 44,
    FancyJoined: 54, // 2
    BigSeparated: 23, // 3
    FullJoined: 1, // 4
    PartiallyJoinedShort: 19, // 5
    CursiveFancyJoined: 6, // 6
    CursiveSeparated: 30, // 7
    BigPartiallyPartiallyJoined: 11, // 8
    SeparatedMono: 21, // 9
} as const;

/**
 * An interface that defines the options for the handwriteText function ⁘
 * 
 * @interface
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
 * A function that writes a given text in a given style and color on a given SVG element ⁘
 * 
 * @param {IHandwriteTextOptions} options - The options for the function.
 * @returns {Promise<void>} - A promise that resolves when the handwriting is done.
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
