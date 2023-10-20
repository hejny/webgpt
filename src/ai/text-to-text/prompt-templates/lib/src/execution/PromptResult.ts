import { string_model_name } from '../../../../../../utils/typeAliases';

/**
 * Prompt result is the simplest concept of execution.
 * It is the result of executing one prompt _(NOT a template)_.
 *
 * @see https://github.com/hejny/ptp#prompt-result
 */
export type PromptResult = PromptCompletionResult | PromptChatResult;

/**
 * Prompt completion result
 * It contains only the following text NOT the whole completion
 */
export type PromptCompletionResult = PromptCommonResult;

/**
 * Prompt chat result
 */
export interface PromptChatResult extends PromptCommonResult {
    // TODO: [🤹‍♂️][🧠] Figure out way how to pass thread / previous messages
}

export interface PromptCommonResult {
    /**
     * Exact text response from the model.
     */
    readonly response: string;

    /**
     * Name of the model used to generate the response.
     */
    readonly model: string_model_name;

    /*
    rawResponse:
        {
        "id": "cmpl-7zIMLeY4GOakQxVLPm1YU3Nsd4dgG",
        "model": "text-davinci-003",
        "usage": {
            "total_tokens": 314,
            "prompt_tokens": 28,
            "completion_tokens": 286
        },
        "object": "text_completion",
        "choices": [
            {
            "text": "\nWelcome to InstaSnap, the selfie master for capturing the perfect moment! \n\nAt InstaSnap, we provide you with the tools you need to take the perfect picture. Browse our selection of filters, editing tools and frames. Whether you're looking for the perfect filter for your latest selfie, or just looking to enhance an old photo, InstaSnap has you covered!\n\nShare your best photos with the world with InstaSnap. Create an account and start sharing with the InstaSnap community today!\n\n\n\n## Filters\n\nOur selection of filters will give you the perfect photo look and feel you are looking for. Choose from basic black and white, vintage, romantic, or one of the many InstaSnap exclusive filters and styles. \n\n## Editing Tools\n\nEnhance the look of your photos with our editing tools. Whether you want to brighten up your selfie or make some adjustments to the colors, InstaSnap can help you take your photos to the next level.\n\n## Frames\n\nMake your photos stand out with InstaSnap's selection of frames. Choose from our classic frames, or go bold with some of the more creative frames.\n\n## Share Your Best Photos\n\nStart sharing your photos with the world today! Create an InstaSnap account and join the InstaSnap community. Upload your best moments and share with your friends.",
            "index": 0,
            "logprobs": null,
            "finish_reason": "stop"
            }
        ],
        "created": 1694842937,
        "warning": "This model version is deprecated. Migrate before January 4, 2024 to avoid disruption of service. Learn more https://platform.openai.com/docs/deprecations"
        }
    */
}

/**
 * TODO: [🧠] !!! Add more execution stats like: model used, previousMessage, chat thread, tokens, spent, full response, etc.
 */
