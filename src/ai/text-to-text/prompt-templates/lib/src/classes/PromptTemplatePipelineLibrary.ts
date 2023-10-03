import { string_name } from '../../../../../../utils/typeAliases';
import { createPtpExecutor } from '../execution/createPtpExecutor';
import { PtpExecutionTools } from '../execution/PtpExecutionTools';
import { PtpExecutor } from '../execution/PtpExecutor';
import { Prompt } from '../types/Prompt';
import { PromptTemplatePipeline } from './PromptTemplatePipeline';

/**
 * Library of prompt template pipelines that groups together prompt template pipelines for an application. This is a very thin wrapper around the Array / Set of prompt template pipelines.
 *
 * Prompt Template Pipeline library is a useful helper in execution, it can be shared between execution and consumer parts of the app and make common knowledge about prompt template pipelines.
 *
 * It allows to create executor functions from prompt template pipelines in the library.
 *
 * @see https://github.com/hejny/ptp#prompt-template-pipeline-library
 */
export class PromptTemplatePipelineLibrary {
    /*
    TODO: 
        !! Make library @ptp/tools
        make createFromJsons, createFromDirectory
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

    /**
     * Gets prompt template pipeline by name
     */
    public getPtp(name: string_name): PromptTemplatePipeline<any /* <- TODO: Get rid of anys */, any> {
        const promptTemplatePipeline = this.promptTemplatePipelines[name];
        if (!promptTemplatePipeline) {
            throw new Error(`Prompt template pipeline with name "${name}" not found`);
        }
        return promptTemplatePipeline;
    }

    /**
     * Checks whether prompt is in the library
     */
    public isPromptInLibrary(prompt: Prompt): boolean {
        // TODO: DO not hardcode this, really validate whether the prompt is in the library
        return true;
    }

    /**
     * Gets executor function for given prompt template pipeline
     */
    public getExecutor(
        name: string_name,
        tools: PtpExecutionTools,
    ): PtpExecutor<any /* <- TODO: Get rid of anys */, any> {
        const ptp = this.getPtp(name);
        return createPtpExecutor({ ptp, tools });
    }
}

/**
 * TODO: !! Add generic type for entry and result params
 * TODO: [🧠] Formarly (before commit 62229afce7668a5b85077cc18becf798b583bf8d) there were two classes PromptTemplatePipelineLibrary+PtpLibraryExecutor (maybe it was better?)
 * TODO: [🧠] Is it better to ptpLibraryExecutor.executePtp('writeXyz',{...}) OR ptpLibraryExecutor.getExecutor('writeXyz')({...})
 * TODO: [🧠] Is it better to pass tools into getExecutor or into constructor
 *             Maybe it is not a good idea to cache executors when they are can be created with different tools
 */
