import { ConfigChecker } from 'configchecker';
import { Vector } from 'xyzt';
import packageJson from './package.json';
import { FULLHD } from './src/constants';
import { AspectRatioRange } from './src/utils/aspect-ratio/AspectRatioRange';
import { expectAspectRatioInRange } from './src/utils/aspect-ratio/expectAspectRatioInRange';
import { DigitalOceanSpaces } from './src/utils/cdn/classes/DigitalOceanSpaces';
import { createColorfulComputeImageColorStats15 } from './src/utils/image/palette/15/createColorfulComputeImageColorStats15';
import { IComputeImageColorStats } from './src/utils/image/utils/IImageColorStats';
import { isRunningInBrowser } from './src/utils/isRunningInWhatever';
import { isPrivateNetwork } from './src/utils/validators/isPrivateNetwork';
import { validateUuid } from './src/utils/validators/validateUuid';

export const APP_VERSION = packageJson.version;
export const APP_NAME = packageJson.name;

const config = ConfigChecker.from({
    ...process.env,

    // Note: To expose env variables to the browser, using this seemingly strange syntax:
    //       @see https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#exposing-environment-variables-to-the-browser
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});

export const NEXT_PUBLIC_URL = config.get('NEXT_PUBLIC_URL').url().required().value;
export const IS_DEVELOPMENT = isPrivateNetwork(
    NEXT_PUBLIC_URL.hostname,
); /* <- TODO: Maybe pass NODE_ENV and not assume that local is automatically dev */
export const IS_PRODUCTION = !IS_DEVELOPMENT;

if (isRunningInBrowser()) {
    // TODO: Also log " client ${provideClientIdWithoutValidation()}" and avoid error unhandledRejection ReferenceError: window is not defined @see https://vercel.com/hejny/1-2i/E2LhCdVbk9hjEa8dE9ww42vnkcTg
    console.info(
        `%c${APP_NAME}${IS_DEVELOPMENT ? ' (in development mode)' : ''} version ${APP_VERSION}`,
        `background: #990055; color: white; font-size: 1.1em; font-weight: bold; padding: 5px; border-radius: 3px;`,
    );
}

export const NEXT_PUBLIC_DEBUG = config.get('NEXT_PUBLIC_DEBUG').boolean().value;

/**
 * The speed of the animations
 * It is useful for recording videos
 *
 * 1 is normal, 2 is twice as fast, 0.5 is twice as slow
 *
 * Note: You can record video and change speef for example here:
 *       - https://online-video-cutter.com/change-video-speed
 */
export const SPEED = 1; // 1 / 5;

export const NEXT_PUBLIC_SUPABASE_URL = config.get('NEXT_PUBLIC_SUPABASE_URL').url().required().value;
export const NEXT_PUBLIC_SUPABASE_ANON_KEY = config.get('NEXT_PUBLIC_SUPABASE_ANON_KEY').required().value;
export const SUPABASE_SERVICE_ROLE_KEY = config.get('SUPABASE_SERVICE_ROLE_KEY').value;

export const VERCEL_GIT_COMMIT_MESSAGE = config.get('VERCEL_GIT_COMMIT_MESSAGE').value;
export const VERCEL_GIT_COMMIT_SHA = config.get('VERCEL_GIT_COMMIT_SHA').value;

export const LIMIT_WALLPAPERS_COUNT = config.get('LIMIT_WALLPAPERS_COUNT').number().default(Infinity).value;
export const LIMIT_WALLPAPERS_EXCLUDE = config.get('LIMIT_WALLPAPERS_EXCLUDE').list().default([]).value;

// TODO: [✍] Replace mocked-api/wallpapers-min-loved.json by WELCOME_WALLPAPERS
// export const WELCOME_WALLPAPERS = config.get('WELCOME_WALLPAPERS').list().default([]).value;

export const OPENAI_API_KEY = config.get('OPENAI_API_KEY').value;

export const AZURE_COMPUTER_VISION_ENDPOINT = config.get('AZURE_COMPUTER_VISION_ENDPOINT').url().value;
export const AZURE_COMPUTER_VISION_KEY = config.get('AZURE_COMPUTER_VISION_KEY').value;

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
] as const;

export const COPILOT_PLACEHOLDERS: Array<string> = [
    // Note: ⏣ Describe the change>
    'Translate to Chinese',
    'Translate to English',
    'Translate to French',
    'Translate to German',
    'Translate to Italian',
    'Translate to Japanese',
    'Translate to Korean',
    'Translate to Portuguese',
    'Translate to Ukrainian',
    'Add email contact pavol@hejny.org',
    'Add phone contact +420 123 456 789',
    'Add a link to website www.pavolhejny.com',
    'Change opening hours on friday to 10:00-12:00',
    `We are temporarily closed due to vacation till tomorrow`,
    `Make better claim`,
    `Make better title`,
    `Shorten text about the company`,
    `Add new product - 3D printer`,
    `Delete the product - 3D printer`,
    'Change phone number to +007 123 456 789',
    'Make the text more friendly',
    'Make the text more formal',
    'Make the text more funny',
    'Make the text more serious',
    'Make the text more professional',
    'Make the text more personal',
    'Make the text more technical',
    'Make the text more simple',
    'Add a new paragraph - "We are the best"',
    'Add a new paragraph - "We are the cheapest"',
    'Add a new paragraph - "We are the fastest"',
    'Add a new paragraph - "We are the most reliable"',
    'Add bullet points why we are the best',
    'Add pricing table',
];

export const MAX_CHARS_IN_TITLE = 'Futuristic Cityscape Wallpaper'.length - 7;
//                                'Tvořím něco z ničeho nic'
//                                'Futuristic Cityscape Wallpaper'

/**
 * Maximum size of custom wallpaper image
 * This will be checked on both client and server
 * If user uploads bigger image, it will be resized
 */
export const WALLPAPER_IMAGE_MAX_ALLOWED_SIZE = FULLHD; // <- TODO: When image for Azure content analysis will be separated from image to upload, allow to have UHD4K images

/**
 * Allowed aspect ratio of custom wallpaper image
 * This will be checked on client (+ in future on server) and wont be allowed to upload image if not in this range
 */
export const WALLPAPER_IMAGE_ASPECT_RATIO_ALLOWED_RANGE: AspectRatioRange = [new Vector(3, 1), new Vector(1, 3)];

// Note: Checking validity of the WALLPAPER_IMAGE_ASPECT_RATIO config
expectAspectRatioInRange('[1]', WALLPAPER_IMAGE_ASPECT_RATIO_ALLOWED_RANGE, FULLHD);

/**
 * @@@
 */
export const COLORSTATS_COMPUTE_METHODS: Array<IComputeImageColorStats<string>> = [
    /*/
    // Full:
    createColorfulComputeImageColorStats15({
        colorBits: 256,
        size: FULLHD,
    }),
    /**/
    createColorfulComputeImageColorStats15({
        colorBits: 16,
        size: FULLHD.scale(0.1),
    }),

    /*
    TODO: There is an infinite loop with "Error: Size must have positive integer values, got 19.2x10.8" when using this:
          Fix it:
        > createColorfulComputeImageColorStats15({
        >     colorBits: 16,
        >     size: FULLHD.scale(0.01),
        > }),
    */
    createColorfulComputeImageColorStats15({
        colorBits: 16,
        size: FULLHD.scale(0.2),
    }),
    /*
    TODO: !! Add more versions (Also full)
    */
    createColorfulComputeImageColorStats15({
        colorBits: 16,
        size: FULLHD,
    }),

    /*
    createColorfulComputeImageColorStats13({
        colorBits: 16,
        size: FULLHD.scale(0.1),
    }),
    createColorfulComputeImageColorStats13({
        colorBits: 16,
        size: FULLHD,
    }),

    */

    // TODO: More with createColorfulComputeImageColorStats
    // TODO: More with different strategy than createColorfulComputeImageColorStats
];

export const COLORSTATS_DEFAULT_COMPUTE_IN_SCRIPT: IComputeImageColorStats<string> = COLORSTATS_COMPUTE_METHODS[0]!;
export const COLORSTATS_DEFAULT_COMPUTE_IN_FRONTEND: IComputeImageColorStats<string> = COLORSTATS_COMPUTE_METHODS[0]!;

// TODO: [🧠] Pass theese as a parameter to the function createComputeImageColorStats

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

export const SYSTEM_AUTHOR_ID = validateUuid('000d2940-4a35-4859-83a8-3c754ea5df51');

// TODO: [🧠] How to do required only on server
export const CDN_BUCKET = config.get('CDN_BUCKET') /*.required([📐])*/.value;
export const CDN_PATH_PREFIX = config.get('CDN_PATH_PREFIX') /*.required([📐])*/.value;
export const CDN_ENDPOINT = config.get('CDN_ENDPOINT') /*.required([📐])*/.value;
export const CDN_ACCESS_KEY_ID = config.get('CDN_ACCESS_KEY_ID') /*.required([📐])*/.value;
export const CDN_SECRET_ACCESS_KEY = config.get('CDN_SECRET_ACCESS_KEY') /*.required([📐])*/.value;
export const CDN_PUBLIC_URL = config.get('CDN_PUBLIC_URL').url() /*.required([📐])*/.value;

export const CDN = (CDN_BUCKET &&
    // [📐]
    new DigitalOceanSpaces({
        bucket: CDN_BUCKET!,
        pathPrefix: CDN_PATH_PREFIX!,
        endpoint: CDN_ENDPOINT!,
        accessKeyId: CDN_ACCESS_KEY_ID!,
        secretAccessKey: CDN_SECRET_ACCESS_KEY!,
        cdnPublicUrl: CDN_PUBLIC_URL!,
        gzip: false /* <- TODO: Maybe just remove this functionality from 1-2i repository */,
    })) as DigitalOceanSpaces;

export const MIDJOURNEY_WHOLE_GALLERY_PATH = 'X:/Mythings/MidJourney';
