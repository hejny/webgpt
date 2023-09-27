import { Promisable } from 'type-fest';
import { TaskProgress } from '../../../../../../components/TaskInProgress/task/TaskProgress';
import { string_name } from '../../../../../../utils/typeAliases';
import { PromptTemplatePipelineLibrary } from '../classes/PromptTemplatePipelineLibrary';
import { PromptTemplateParams } from '../types/PromptTemplateParams';
import { PtpExecutionTools } from '../types/PtpExecutionTools';
import { PtpExecutor } from '../types/PtpExecutor';
import { createPtpExecutor } from './createPtpExecutor';

export class PtpLibraryExecutor {
    constructor(
        private readonly ptpLibrary: PromptTemplatePipelineLibrary,
        private readonly tools: PtpExecutionTools,
    ) {}

    private readonly ptpExecutorsCache: Record<string_name, PtpExecutor<any /* <- TODO: Get rid of anys */, any>> = {};

    public executePtp<
        TEntryParams extends PromptTemplateParams,
        TResultParams extends PromptTemplateParams /* <- TODO: This sould be generic of whole PtpLibraryExecutor NOT just this method */,
    >(
        name: string_name,
        entryParams: TEntryParams,
        onProgress?: (taskProgress: TaskProgress) => Promisable<void>,
    ): Promise<TResultParams> {
        if (!this.ptpExecutorsCache[name]) {
            const ptp = this.ptpLibrary.getPtp(name);
            this.ptpExecutorsCache[name] = createPtpExecutor({ ptp, tools: this.tools });
        }

        const ptpExecutor = this.ptpExecutorsCache[name]!;

        return /* not await */ ptpExecutor(entryParams, onProgress);
    }
}

/**
 * TODO: [🧠] Is it better to ptpLibraryExecutor.executePtp('writeXyz',{...}) OR ptpLibraryExecutor.getPtp('writeXyz')({...})
 */
