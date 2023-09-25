export type PromptTemplateParams = {
    /* Note: We dont want index signature here because of:
             1) It can lead to runtime errors when reading undefined params which fits into index signature
             2) When creating specific entry/result interface, there will be need to put there index signature or extend this interface

       TODO: How to constrain to only string values without index signature?
    */
};

/**
 *
 * TODO: Maybe allow richer types for values
 * TODO: !!! Rename in such a way that short name is not `promptTemplatePipeline`
 */
