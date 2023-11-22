export interface SimpleTextDialogueResponse {
    /**
     * Answer to the prompt
     *
     * - `null` means that the prompt is answered with `null`
     * - `string` means the answer to the prompt
     */
    answer: string | null;
}

/**
 * TODO: !!! Annotate + readonly
 */
