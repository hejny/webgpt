export const PROMPTING_VARIANTS = ['COMPLETION', 'CHAT'] as const;
export type PromptingVariant = typeof PROMPTING_VARIANTS[number];
