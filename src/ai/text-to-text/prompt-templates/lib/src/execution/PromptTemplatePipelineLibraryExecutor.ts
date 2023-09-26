import { PromptingExecutionTools } from '../types/PromptingExecutionTools';

export class PromptTemplatePipelineLibraryExecutor {
    constructor(
        private readonly promptTemplatePipelineLibrary: PromptTemplatePipelineLibraryExecutor,
        private readonly tools: PromptingExecutionTools,
    ) {}
}
