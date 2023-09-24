export const MODEL_VARIANTS = ['COMPLETION', 'CHAT'] as const;
export type ModelVariant = typeof MODEL_VARIANTS[number];

export interface ModelRequirements {
    variant: ModelVariant;
}

/**
 * TODO: Add here more requirement options like max context size, max tokens, etc.
 */
