export type IComputeColorstatsWork = typeof COMPUTE_COLORS_WORKTYPE[number];

export const COMPUTE_COLORS_WORKTYPE = [
    'createImageInBrowser',
    'createImageInWorker',
    'createImageInNode',
    'computeImagePalette',
    'scaleImage',
    'colorDownscaleImage',
    'computeImageAverageColor',
    'computeImageMostFrequentColors',
    'computeImageMostGroupedColors',
    'computeImageMostSatulightedColors',
    'getImageUniqueColors',
] as const;
