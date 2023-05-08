import { WithTake } from '../take/interfaces/ITakeChain';
import { take } from '../take/take';
import { CSS_COLORS } from './css-colors';
import { checkChanellValue } from './internal-utils/checkChanellValue';

export type number_integer = number;
export type number_positive = number;
export type number_percent = number;
export type string_color = string;
export type string_url_image = string;

/**
 * Color object is represents rbg color with alpha chanell
 *
 * Note: there is nothing as fromObject and toObject because much better and most logic way how top serialize color is to serialize it to hex string #009edd
 *
 * @collboard-modules-sdk
 *
 */
export class Color {
    // TODO: For each method corresponding static method should be created
    //       Like clone can be done by color.clone() OR Color.clone(color)

    // TODO: Probably as an indipendent LIB OR add to LIB xyzt (ask @roseckyj)

    /**
     * Creates a new Color instance from miscellaneous formats
     * - It can receive Color instance and just return the same instance
     * - It can receive color in string format for example `#009edd`, `rgb(0,158,221)`, `rgb(0%,62%,86.7%)`, `hsl(197.1,100%,43.3%)`
     *
     * Note: This is not including fromImage because detecting color from an image is heavy task which requires async stuff and we cannot safely determine with overloading if return value will be a promise
     *
     * @param color
     * @returns Color object
     */
    public static from(color: string_color | Color): WithTake<Color> {
        if (color instanceof Color) {
            return take(color);
        } else if (typeof color === 'string') {
            return Color.fromString(color);
        } else {
            console.error({ color });
            throw new Error(`Can not create color from given object`);
        }
    }

    /**
     * Creates a new Color instance from miscellaneous string formats
     *
     * @param color as a string for example `#009edd`, `rgb(0,158,221)`, `rgb(0%,62%,86.7%)`, `hsl(197.1,100%,43.3%)`, `red`, `darkgrey`,...
     * @returns Color object
     */
    public static fromString(color: string_color): WithTake<Color> {
        if (CSS_COLORS[color as keyof typeof CSS_COLORS]) {
            return Color.fromString(CSS_COLORS[color as keyof typeof CSS_COLORS]);

            // -----
        } else if (/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(color)) {
            return Color.fromHex(color);

            // -----
        } else if (/^hsl\(\s*(\d+)\s*,\s*(\d+(?:\.\d+)?%)\s*,\s*(\d+(?:\.\d+)?%)\)$/.test(color)) {
            return Color.fromHsl(color);

            // -----
        } else if (/^rgb\((\s*[0-9-.%]+\s*,?){3}\)$/.test(color)) {
            // TODO: [0] Should be fromRgbString and fromRgbaString one or two functions
            return Color.fromRgbString(color);

            // -----
        } else if (/^rgba\((\s*[0-9-.%]+\s*,?){4}\)$/.test(color)) {
            return Color.fromRgbaString(color);

            // -----
        } else {
            throw new Error(`Can not create a new Color instance from string "${color}".`);
        }
    }

    /**
     * Gets common color frol library
     *
     * @param key as a css string like `midnightblue`
     * @returns Color object
     */
    public static get(key: keyof typeof CSS_COLORS): WithTake<Color> {
        if (!CSS_COLORS[key]) {
            throw new Error(`"${key}" is not a common css color.`);
        }

        return Color.fromString(CSS_COLORS[key]);
    }

    /**
     * Creates a new Color instance from average color of given image
     *
     * @param image as a source for example `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjYJh39z8ABJgCe/ZvAS4AAAAASUVORK5CYII=`
     * @returns Color object
     */
    public static async fromImage(image: string_url_image): Promise<Color> {
        // TODO: Implement + Add samples here [👠]
        return Color.fromHex(`#009edd`);
    }

    /**
     * Creates a new Color instance from color in hex format
     *
     * @param color in hex for example `#009edd`, `009edd`, `#555`,...
     * @returns Color object
     */
    public static fromHex(hex: string_color): WithTake<Color> {
        const hexOriginal = hex;

        if (hex.startsWith('#')) {
            hex = hex.substring(1);
        }

        if (hex.length === 3) {
            return Color.fromHex3(hex);
        }

        if (hex.length === 6) {
            return Color.fromHex6(hex);
        }

        if (hex.length === 8) {
            return Color.fromHex8(hex);
        }

        throw new Error(`Can not parse color from hex string "${hexOriginal}"`);
    }

    /**
     * Creates a new Color instance from color in hex format with 3 color digits (without alpha chanell)
     *
     * @param color in hex for example `09d`
     * @returns Color object
     */
    private static fromHex3(hex: string_color): WithTake<Color> {
        const r = parseInt(hex.substr(0, 1), 16) * 16;
        const g = parseInt(hex.substr(1, 1), 16) * 16;
        const b = parseInt(hex.substr(2, 1), 16) * 16;
        return take(new Color(r, g, b));
    }

    /**
     * Creates a new Color instance from color in hex format with 6 color digits (without alpha chanell)
     *
     * @param color in hex for example `009edd`
     * @returns Color object
     */
    private static fromHex6(hex: string_color): WithTake<Color> {
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        return take(new Color(r, g, b));
    }

    /**
     * Creates a new Color instance from color in hex format with 8 color digits (with alpha chanell)
     *
     * @param color in hex for example `009edd`
     * @returns Color object
     */
    private static fromHex8(hex: string_color): WithTake<Color> {
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        const a = parseInt(hex.substr(6, 2), 16);
        return take(new Color(r, g, b, a));
    }

    /**
     * Creates a new Color instance from color in hsl format
     *
     * @param color as a hsl for example `hsl(197.1,100%,43.3%)`
     * @returns Color object
     */
    public static fromHsl(hsl: string_color): WithTake<Color> {
        // TODO: Implement + Add samples here [👠]
        throw new Error(`Can not create a new Color instance from supposed hsl formatted string "${hsl}".`);
    }

    /**
     * Creates a new Color instance from color in rgb format
     *
     * @param color as a rgb for example `rgb(0,158,221)`, `rgb(0%,62%,86.7%)`
     * @returns Color object
     */
    public static fromRgbString(rgb: string_color): WithTake<Color> {
        // TODO: [0] Should be fromRgbString and fromRgbaString one or two functions
        // TODO: Implement + Add samples here [👠]
        throw new Error(`Can not create a new Color instance from supposed rgb formatted string "${rgb}".`);
    }

    /**
     * Creates a new Color instance from color in rbga format
     *
     * @param color as a rgba for example `rgba(0,158,221,0.5)`, `rgb(0%,62%,86.7%,50%)`
     * @returns Color object
     */
    public static fromRgbaString(rgba: string_color): WithTake<Color> {
        // TODO: [0] Should be fromRgbString and fromRgbaString one or two functions
        // TODO: Implement + Add samples here [👠]
        throw new Error(`Can not create a new Color instance from supposed rgba formatted string "${rgba}".`);
    }

    /**
     * Creates a new Color for color chanells values
     *
     * @param red number from 0 to 255
     * @param green number from 0 to 255
     * @param blue number from 0 to 255
     * @param alpha number from 0 (transparent) to 255 (opaque = default)
     * @returns Color object
     */
    public static fromValues(red: number, green: number, blue: number, alpha: number = 255): WithTake<Color> {
        return take(new Color(red, green, blue, alpha));
    }

    /**
     * Creates new Color object
     *
     * Note: Consider using one of static methods like `from` or `fromString`
     *
     * @param red number from 0 to 255
     * @param green number from 0 to 255
     * @param blue number from 0 to 255
     * @param alpha number from 0 (transparent) to 255 (opaque)
     */
    private constructor(
        readonly red: number,
        readonly green: number,
        readonly blue: number,
        readonly alpha: number = 255,
    ) {
        checkChanellValue('Red', red);
        checkChanellValue('Green', green);
        checkChanellValue('Blue', blue);
        checkChanellValue('Alpha', alpha);
    }

    /**
     * Shortcut for `red` property
     * @alias red
     */
    public get r(): number {
        return this.red;
    }

    /**
     * Shortcut for `green` property
     * @alias green
     */
    public get g(): number {
        return this.green;
    }

    /**
     * Shortcut for `blue` property
     * @alias blue
     */
    public get b(): number {
        return this.blue;
    }

    /**
     * Shortcut for `alpha` property
     * @alias alpha
     */
    public get a(): number {
        return this.alpha;
    }

    /**
     * Shortcut for `alpha` property
     * @alias alpha
     */
    public get opacity(): number {
        return this.alpha;
    }

    /**
     * Shortcut for 1-`alpha` property
     */
    public get transparency(): number {
        return 255 - this.alpha;
    }

    public withAlpha(alpha: number): WithTake<Color> {
        return this.withMutation((r, g, b, a) => {
            return [r, g, b, (((a / 255) * alpha) / 255) * 255];
        });
    }

    public get negative(): WithTake<Color> {
        // TODO: !!! negative should be operator
        return this.withMutation((r, g, b, a) => {
            return [255 - r, 255 - g, 255 - b, a];
        });
    }
    public get grayscale(): WithTake<Color> {
        // TODO: !!! grayscale should be operator
        return this.withMutation((r, g, b, a) => {
            const v = (r + b + g) / 3;
            return [v, v, v, a];
        });
    }

    /**
     * Creates best text color for this background color
     *
     * @returns white or black color
     */
    public textColor(): WithTake<Color> {
        // TODO: !!! grayscale should be operator nearest
        if ((this.red + this.green + this.blue) / 3 / 255 > 0.5) {
            return Color.fromString('black');
        } else {
            return Color.fromString('white');
        }
    }

    public withMutation(
        modifier: (red: number, green: number, blue: number, opacity: number) => [number, number, number, number],
    ): WithTake<Color> {
        // TODO: !!! Deprecate and remove
        return take(
            new Color(
                ...(modifier(this.red, this.green, this.blue, this.alpha).map((value) => Math.round(value)) as [
                    number,
                    number,
                    number,
                    number,
                ]),
            ),
        );
    }

    public clone(): WithTake<Color> {
        return take(new Color(this.red, this.green, this.blue, this.alpha));
    }

    public get opaque(): WithTake<Color> {
        // TODO: !!! opaque should be operator nearest
        return this.withAlpha(1);
    }

    public get transparent(): WithTake<Color> {
        // TODO: !!! transparent should be operator nearest
        return this.withAlpha(0);
    }

    public toString(): string_color {
        return this.toHex();
    }

    public toHex(): string_color {
        if (this.alpha === 255) {
            return `#${this.red.toString(16).padStart(2, '0')}${this.green.toString(16).padStart(2, '0')}${this.blue
                .toString(16)
                .padStart(2, '0')}`;
        } else {
            return `#${this.red.toString(16).padStart(2, '0')}${this.green.toString(16).padStart(2, '0')}${this.blue
                .toString(16)
                .padStart(2, '0')}${this.alpha.toString(16).padStart(2, '0')}`;
        }
    }

    public toRgb(): string_color {
        if (this.alpha === 255) {
            return `rgb(${this.red}, ${this.green}, ${this.blue})`;
        } else {
            return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
        }
    }

    public toHsl(): string_color {
        throw new Error(`Getting HSL is not implemented`);
    }
}

/**
 * TODO: !!! Transfer back to Collboard (whole directory)
 * TODO: Maybe [🏌️‍♂️] change ACRY toString => (toHex) toRbg when there will be toRgb and toRgba united
 * TODO: Convert getters to methods - getters only for values
 * TODO: Write tests
 * TODO: Getters for alpha, opacity, transparency, r,b,g,h,s,l,a,...,
 * TODO: [0] Should be fromRgbString and fromRgbaString one or two functions + one or two regex
 * TODO: Use rgb, rgba, hsl for testing and parsing and use SAME regex
 * TODO: Regex for rgb, rgba, hsl does not support all options like deg, rad, turn,...
 * TODO: Convolution matrix
 * TODO: Maybe connect with textures
 */
