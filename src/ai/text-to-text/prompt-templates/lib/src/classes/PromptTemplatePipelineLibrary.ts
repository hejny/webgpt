import { string_attribute } from '../../../../../../utils/typeAliases';
import { PromptTemplatePipelineJson } from '../types/PromptTemplatePipelineJson';
import { isPromptTemplatePipelineJsonValid } from '../validation/isPromptTemplatePipelineSourceValid';
import { PromptTemplate } from './PromptTemplate';

export class PromptTemplatePipelineLibrary {
    public static fromJsons(sources: ...Array<PromptTemplatePipelineJson>): PromptTemplatePipelineLibrary {
       
    }

    private constructor(
        private readonly promptTemplatePipelines: Array<PromptTemplatePipeline   ggfffffggggg>,
    ) {
        
    }

    public get entryPromptTemplate(): PromptTemplate<any /* <- TODO: Get rid of any */> {
        return this.promptTemplates[0]!.promptTemplate;
    }

    
}

/**
 * TODO: !!! Add generic type for entry and result params
 */
