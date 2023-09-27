import { string_name } from '../../../../../../utils/typeAliases';
import { createPtpExecutor } from '../execution/createPtpExecutor';
import { PtpExecutor } from '../execution/PtpExecutor';
import { PtpExecutionTools } from '../types/PtpExecutionTools';
import { Prompt } from './Prompt';
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

    public isPromptInLibrary(prompt: Prompt): boolean {
        // TODO: DO not hardcode this, really validate whether the prompt is in the library
        return true;
    }

    private readonly ptpExecutorsCache: Record<string_name, PtpExecutor<any /* <- TODO: Get rid of anys */, any>> = {};

    public getExecutor(
        name: string_name,
        tools: PtpExecutionTools,
    ): PtpExecutor<any /* <- TODO: Get rid of anys */, any> {
        if (!this.ptpExecutorsCache[name]) {
            const ptp = this.getPtp(name);
            this.ptpExecutorsCache[name] = createPtpExecutor({ ptp, tools });
        }

        const ptpExecutor = this.ptpExecutorsCache[name]!;

        return ptpExecutor;
    }
}

/**
 * TODO: !!! Add generic type for entry and result params
 * TODO: [🧠] Formarly (before commit 62229afce7668a5b85077cc18becf798b583bf8d) there were two classes PromptTemplatePipelineLibrary+PtpLibraryExecutor (maybe it was better?)
 * TODO: [🧠] Is it better to ptpLibraryExecutor.executePtp('writeXyz',{...}) OR ptpLibraryExecutor.getExecutor('writeXyz')({...})
 * TODO: [🧠] Is it better to pass tools into getExecutor or into constructor
 *             Maybe it is not a good idea to cache executors when they are can be created with different tools
 */
