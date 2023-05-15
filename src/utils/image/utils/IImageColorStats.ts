import { Color } from '../../color/Color';
import { WithTake } from '../../take/interfaces/ITakeChain';

/**
 * Define an interface for the image color statistics
 */
export interface IImageColorStats extends IImageColorStatsRegion {
    version: number;
    // TODO: colorSpace:number

    bottomHalf: IImageColorStatsRegion;
    bottomThird: IImageColorStatsRegion;
    bottomLine: IImageColorStatsRegion;
}

/**
 * Define an interface for the image color statistics for one particular region
 */
export interface IImageColorStatsRegion {
    // TODO: region: IRegion + pixel size

    /**
     * The average color of the image as a Color object
     */
    averageColor: WithTake<Color>;

    /**
     * The lightest color of the image as a Color object
     */
    lightestColor: WithTake<Color>;

    /**
     * The darkest color of the image as a Color object
     */
    darkestColor: WithTake<Color>;

    /**
     * The most saturation*lightness colors of the image as a Color object ...@@@!!!!


nejdřív všechny barvy se řadím
nejdříve futruju ty Šárka které mají alespoň nějakou minimální hodnotu – pokud je obrázek černobílý tohle bude prostě prázdné a nevadí mi to
potom vyberu pouze ty, které mají alespoň 0.62 – zlatý řez saturation X light hodnoty
ty pak vybírám ty pak postupně beru od něj do nejméně avšak maximálně do těch 0,62 a u každé hodnotím, zda je její hue alespoň o 30 úhlových stupňů jiné oproti všem ostatním


     */
    mostSatulightedColors: Array<WithTake<Color>>;

    /**
     * The most frequent color of the image as a Color object
     */
    mostFrequentColors: Array<WithTake<Color>>;

    /**
     * The most grouped color of the image as a Color object
     */
    mostGroupedColors: Array<WithTake<Color>>;

    /**
     * Colors that are nearest and furthest from white
     */
    minmaxWhite: [WithTake<Color>, WithTake<Color>];

    /**
     * Colors that are nearest and furthest from red
     */
    minmaxRed: [WithTake<Color>, WithTake<Color>];

    /**
     * Colors that are nearest and furthest from green
     */
    minmaxGreen: [WithTake<Color>, WithTake<Color>];

    /**
     * Colors that are nearest and furthest from blue
     */
    minmaxBlue: [WithTake<Color>, WithTake<Color>];
}

/**
 * TODO: !! MinMax as interface as {min: Color, max: Color}
 */
