/**
 *
 * !!! Make branded type PromptTemplatePipelineString
 * !!! Copy to all 3
 * Note: Theese 3 are representing same thing, but in different forms
 *     - `PromptTemplatePipelineString` !!!
 *     - `PromptTemplatePipelineJson` !!!
 *     - `PromptTemplatePipeline` !!!
 */
export type PromptTemplatePipelineString = string & {
    __type: 'PromptTemplatePipeline' /* <- TODO: [0] What is the best shape of the additional object in branded types */;
};
