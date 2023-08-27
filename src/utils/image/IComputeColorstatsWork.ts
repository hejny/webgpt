export type IComputeColorstatsWork = typeof COMPUTE_COLORS_WORKTYPE[number];

export const COMPUTE_COLORS_WORKTYPE = [
    // Construct image:
    'createImageInBrowser',
    'createImageInWorker',
    'createImageInNode',

    // Generic image manipulation
    'scaleImage',
    'colorDownscaleImage',

    // Compute colorstats
    'computeImageColorStats',
    'computeImagePalette',

    // Utils to compute colorstats
    'computeImageAverageColor',
    'computeImageMostFrequentColors',
    'computeImageMostGroupedColors',
    'computeImageMostSatulightedColors',
    'getImageUniqueColors',
] as const;
