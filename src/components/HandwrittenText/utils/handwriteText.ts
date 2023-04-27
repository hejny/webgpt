import { loadAndRunExternalScript } from './loadAndRunExternalScript';

interface IHandwriteTextOptions {
    text: string;
    speed: number;
    bias: number;
    width: number;
    style: number;
    svgElement: SVGElement;
}

export async function handwriteText(options: IHandwriteTextOptions) {
    await loadAndRunExternalScript('/handwritten/script.js');
    await (window as any).handwriteText({ ...options, modelSrc: '/handwritten/d.bin' }) /* <- !!! Return promise */;
}
