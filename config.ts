import { ConfigChecker } from 'configchecker';
import { Vector } from 'xyzt';
import packageJson from './package.json';
import { createColorfulComputeImageColorStats } from './src/utils/image/utils/10-createColorfulComputeImageColorStats';
import { IComputeImageColorStats } from './src/utils/image/utils/IImageColorStats';

export const VERSION = packageJson.version;
export const DEBUG = {
    backgroundPatternPicker: true,
    showGrid: false,
};

const config = ConfigChecker.from(process.env);

export const VERCEL_GIT_COMMIT_MESSAGE = config.get('VERCEL_GIT_COMMIT_MESSAGE').value;
export const VERCEL_GIT_COMMIT_SHA = config.get('VERCEL_GIT_COMMIT_SHA').value;

export const OPENAI_API_KEY = config.get('OPENAI_API_KEY').value;

export const FONTS = [
    'Montserrat',
    'Poppins',
    'Open Sans',
    'Lobster',
    'Playfair Display',
    'Great Vibes',
    'Lato',
    'Roboto',
    'Inter',
    'IBM Plex Sans',
    'Exo 2',
    'Orbitron',
    'Dancing Script',
    'Alegreya',
    'Raleway',
    'Futura',
    'Barlow Condensed',
    'Cabin',
    'Cinzel',
    'Cinzel Decorative',
    'Cormorant Garamond',
    'Creepster' /* <- TODO: Where it is used */,
    // TODO: !! List more
];

export const MAX_CHARS_IN_TITLE = 'Futuristic Cityscape Wallpaper'.length - 3;
//                                'Tvořím něco z ničeho nic'
//                                'Futuristic Cityscape Wallpaper'

export const IMAGE_NATURAL_SIZE = new Vector(1920, 1080);

/**
 * @@@
 */
export const COLORSTATS_COMPUTE_METHODS: Array<IComputeImageColorStats<string>> = [
    createColorfulComputeImageColorStats({
        colorBits: 16,
        size: IMAGE_NATURAL_SIZE.scale(0.1),
    }),
    createColorfulComputeImageColorStats({
        colorBits: 16,
        size: IMAGE_NATURAL_SIZE,
    }),

    // TODO: More with createColorfulComputeImageColorStats
    // TODO: More with different strategy than createColorfulComputeImageColorStats
];

export const COLORSTATS_DEFAULT_COMPUTE: IComputeImageColorStats<string> = COLORSTATS_COMPUTE_METHODS[0];

// TODO: [🧠] !! Pass theese as a parameter to the function createComputeImageColorStats

export const COLORS_LIMIT = 10;
export const MOST_SATULIGHTED_COLORS_SATULIGHTION_THEASHOLD_RATIO = 0.5;

/**
 * How much the color should be different (in hue) to be considered different
 * As degrees of hue
 */
export const DIFFERENT_COLOR_HUE_THEASHOLD_DEGREES = 30;

/**
 * How much the color should be different to be considered different
 * As ratio of distance between white and black
 */
export const DIFFERENT_COLOR_DISTANCE_THEASHOLD_RATIO = 0.1; /* <- As a ratio of distance between white and black */
