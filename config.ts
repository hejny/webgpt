import { ConfigChecker } from 'configchecker';
import { Vector } from 'xyzt';
import packageJson from './package.json';
import { createColorfulComputeImageColorStats14 } from './src/utils/image/palette/14/createColorfulComputeImageColorStats14';
import { IComputeImageColorStats } from './src/utils/image/utils/IImageColorStats';

export const VERSION = packageJson.version;

const config = ConfigChecker.from({
    ...process.env,

    // Note: To expose env variables to the browser, using this seemingly strange syntax:
    //       @see https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#exposing-environment-variables-to-the-browser
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});

export const NEXT_PUBLIC_URL = config.get('NEXT_PUBLIC_URL').url().required().value;

export const NEXT_PUBLIC_SUPABASE_URL = config.get('NEXT_PUBLIC_SUPABASE_URL').url().required().value;
export const NEXT_PUBLIC_SUPABASE_ANON_KEY = config.get('NEXT_PUBLIC_SUPABASE_ANON_KEY').required().value;
export const SUPABASE_SERVICE_ROLE_KEY = config.get('SUPABASE_SERVICE_ROLE_KEY').value;

export const VERCEL_GIT_COMMIT_MESSAGE = config.get('VERCEL_GIT_COMMIT_MESSAGE').value;
export const VERCEL_GIT_COMMIT_SHA = config.get('VERCEL_GIT_COMMIT_SHA').value;

export const LIMIT_WALLPAPER_COUNT = config.get('LIMIT_WALLPAPER_COUNT').number().default(Infinity).value;
export const LIMIT_WALLPAPER_EXCLUDE = config.get('LIMIT_WALLPAPER_EXCLUDE').list().default([]).value;

export const OPENAI_API_KEY = config.get('OPENAI_API_KEY').value;

export const EXPORT_OPTIONS = {
    isExported: false,
    publicUrl: NEXT_PUBLIC_URL,
};

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
    'Barlow Condensed' /* <- I 💖 this font! */,
    'Cabin',
    'Cinzel',
    'Cinzel Decorative',
    'Cormorant Garamond',
    // TODO: !! List more
];

export const MAX_CHARS_IN_TITLE = 'Futuristic Cityscape Wallpaper'.length - 7;
//                                'Tvořím něco z ničeho nic'
//                                'Futuristic Cityscape Wallpaper'

export const IMAGE_NATURAL_SIZE = new Vector(1920, 1080);

/**
 * @@@
 */
export const COLORSTATS_COMPUTE_METHODS: Array<IComputeImageColorStats<string>> = [
    /*/
    // Full:
    createColorfulComputeImageColorStats14({
        colorBits: 256,
        size: IMAGE_NATURAL_SIZE,
    }),
    /**/
    createColorfulComputeImageColorStats14({
        colorBits: 16,
        size: IMAGE_NATURAL_SIZE.scale(0.1),
    }),
    /* 
    TODO: !! Add more versions (Also full)
    */
    createColorfulComputeImageColorStats14({
        colorBits: 16,
        size: IMAGE_NATURAL_SIZE,
    }),

    /*
    createColorfulComputeImageColorStats13({
        colorBits: 16,
        size: IMAGE_NATURAL_SIZE.scale(0.1),
    }),
    createColorfulComputeImageColorStats13({
        colorBits: 16,
        size: IMAGE_NATURAL_SIZE,
    }),

    */

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

/**
 * How much the color should be different to be considered OK as text color on background
 * As ratio of distance between white and black
 */
export const TEXT_BACKGROUND_COLOR_DISTANCE_THEASHOLD_RATIO = 0.5; /* <- As a ratio of distance between white and black */

/**
 * How much can be primary (background) color different from average color to be considered OK
 * As ratio of distance between white and black
 */
export const PRIMARY_TO_AVERAGE_MAX_COLOR_DISTANCE_THEASHOLD_RATIO = 0.1; /* <- As a ratio of distance between white and black */
