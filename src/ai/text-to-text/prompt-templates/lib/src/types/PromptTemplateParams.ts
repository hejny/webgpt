/**
 * Parameters that are placed in the prompt template and replaced to create the prompt. It is a simple key-value object.
 *
 * Note: There are three types of template params, depending on how they are used in the prompt template pipeline:
 *     -   **Entry params** are required to execute the prompt template pipeline.
 *     -   **Intermediate params** are used internally in the prompt template pipeline.
 *     -   **Result params** are not used internally in the prompt template pipeline, but are returned as the result of the prompt template pipeline execution.
 *
 * @see https://github.com/webgptorg/ptp#prompt-template-params
 *
 */
export type PromptTemplateParams = {
    /* Note: We dont want index signature here because of:
             1) It can lead to runtime errors when reading undefined params which fits into index signature
             2) When creating specific entry/result interface, there will be need to put there index signature or extend this interface

       TODO: How to constrain to only string values without index signature?
    */
};

/**
 * TODO: !!! Delete the file
 * TODO: [🧠][🤜] !!! Maybe remove typescript types for entry/result params and use only runtime validation
 * TODO: Maybe allow richer types for values
 * TODO: [🧠] Rename "PromptTemplateParams" in such a way that short name is not "PTP" (because it colides with "PromptTemplatePipeline")
 */
