import { ConfigChecker } from 'configchecker';
import packageJson from './package.json';

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
    // TODO: !!! List more
];

export const COLORSTATS_VERSION = 7;
export const COLORS_LIMIT = 10;
export const MOST_SATULIGHTED_COLORS_SATULIGHTION_THEASHOLD_RATIO = 0.5;
export const MOST_SATULIGHTED_COLORS_HUE_TRERESHOLD_DEGREES = 30;

export const MOST_FREQUENT_COLORS_DISTANCE_THEASHOLD_RATIO = 0.1; /* <- As a ratio of distance between white and black */
