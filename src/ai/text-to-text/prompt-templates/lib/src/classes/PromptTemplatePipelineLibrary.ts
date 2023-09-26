import { string_name } from '../../../../../../utils/typeAliases';
import { PromptTemplatePipeline } from './PromptTemplatePipeline';

export class PromptTemplatePipelineLibrary {
    /*
    TODO: !!! OR make createFromJsons, createFromDirectory
    public static fromJsons(...sources: Array<PromptTemplatePipelineJson>): PromptTemplatePipelineLibrary {
        return new PromptTemplatePipelineLibrary(sources.map((source) => PromptTemplatePipeline.fromJson(source)));
    }
    */

    public constructor(
        private readonly promptTemplatePipelines: Record<
            string_name,
            PromptTemplatePipeline<any /* <- TODO: Get rid of anys */, any>
        >,
    ) {}

    public getPtp(name: string_name): PromptTemplatePipeline<any /* <- TODO: Get rid of anys */, any> {
        const promptTemplatePipeline = this.promptTemplatePipelines[name];
        if (!promptTemplatePipeline) {
            throw new Error(`Prompt template pipeline with name "${name}" not found`);
        }
        return promptTemplatePipeline;
    }
}

/**
 * TODO: !!! Add generic type for entry and result params
 */
