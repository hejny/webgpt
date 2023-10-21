import spaceTrim from 'spacetrim';
import { Promisable } from 'type-fest';
import { TaskProgress } from '../../../../../../components/TaskInProgress/task/TaskProgress';
import { PromptTemplatePipeline } from '../classes/PromptTemplatePipeline';
import { PromptTemplateParams } from '../types/PromptTemplateParams';
import { PromptTemplatePipelineJsonTemplate } from '../types/PromptTemplatePipelineJson/PromptTemplatePipelineJsonTemplate';
import { replaceParams } from '../utils/replaceParams';
import { ExecutionTools } from './ExecutionTools';
import { PtpExecutor } from './PtpExecutor';

interface CreatePtpExecutorOptions<
    TInputParams extends PromptTemplateParams,
    TOutputParams extends PromptTemplateParams,
> {
    readonly ptp: PromptTemplatePipeline<TInputParams, TOutputParams>;
    readonly tools: ExecutionTools;
}

/**
 * Creates executor function from prompt template pipeline and execution tools.
 *
 * Note: Consider using getExecutor method of the library instead of using this function
 */
export function createPtpExecutor<
    TInputParams extends PromptTemplateParams,
    TOutputParams extends PromptTemplateParams,
>(options: CreatePtpExecutorOptions<TInputParams, TOutputParams>): PtpExecutor<TInputParams, TOutputParams> {
    const { ptp, tools } = options;

    const ptpExecutor = async (
        inputParams: TInputParams,
        onProgress?: (taskProgress: TaskProgress) => Promisable<void>,
    ) => {
        let paramsToPass: PromptTemplateParams = inputParams;
        let currentPtp: PromptTemplatePipelineJsonTemplate | null = ptp.entryPromptTemplate;

        while (currentPtp !== null) {
            const { name, description } = ptp.getResultingParameter(currentPtp!.name);

            if (onProgress) {
                await onProgress({
                    name: `ptp-executor-frame-${name}`,
                    title: `🖋 ${description}`,
                    isDone: false,
                });
            }

            let promptResult: string;

            executionType: switch (currentPtp.executionType) {
                case 'SIMPLE_TEMPLATE':
                    promptResult = replaceParams(currentPtp.content, paramsToPass);
                    break executionType;

                case 'PROMPT_TEMPLATE':
                    const prompt = {
                        ptpUrl: '!!!',
                        parameters: paramsToPass,
                        content: replaceParams(currentPtp.content, paramsToPass),
                        modelRequirements: currentPtp.modelRequirements,
                    };
                    variant: switch (currentPtp.modelRequirements.variant) {
                        case 'CHAT':
                            const chatThread = await tools.natural.gptChat(prompt);
                            // TODO: Use all information from chatThread like "model"
                            // TODO: [🍬] Destroy chatThread
                            promptResult = chatThread.content;
                            break variant;
                        case 'COMPLETION':
                            const completionResult = await tools.natural.gptComplete(prompt);
                            // TODO: Use all information from chatThread like "model"
                            promptResult = completionResult.content;
                            break variant;
                        default:
                            throw new Error(`Unknown model variant "${currentPtp.modelRequirements.variant}"`);
                    }
                    break executionType;

                case 'SCRIPT':
                    if (tools.script.length === 0) {
                        throw new Error(`No script execution tools are available`);
                    }
                    if (!currentPtp.contentLanguage) {
                        throw new Error(`Script language is not defined for prompt template "${currentPtp.name}"`);
                    }

                    const errors: Array<Error> = [];
                    let isSuccessful = false;

                    script: for (const scriptTools of tools.script) {
                        try {
                            promptResult = await scriptTools.execute({
                                scriptLanguage: currentPtp.contentLanguage,
                                script: currentPtp.content,
                                parameters: paramsToPass,
                            });
                            isSuccessful = true;
                            break script;
                        } catch (error) {
                            if (!(error instanceof Error)) {
                                throw error;
                            }

                            errors.push(error);
                        }

                        if (isSuccessful) {
                            break executionType;
                        }

                        if (errors.length === 1) {
                            throw errors[0];
                        } else {
                            throw new Error(
                                spaceTrim(
                                    (block) => `
                                        Script execution failed ${errors.length} times

                                        ${block(errors.map((error) => '- ' + error.message).join('\n\n'))}
                                    `,
                                ),
                            );
                        }
                    }
                    promptResult = '';
                    // Note: This line is unreachable because of the break executionType above
                    break executionType;

                case 'PROMPT_DIALOG':
                    const promptToUser = replaceParams(currentPtp.content, paramsToPass);
                    promptResult = await tools.userInterface.promptDialog(promptToUser);
                    break executionType;

                default:
                    throw new Error(`Unknown execution type "${currentPtp.executionType}"`);
            }

            if (onProgress) {
                onProgress({
                    name: `ptp-executor-frame-${name}`,
                    isDone: true,
                });
            }

            paramsToPass = {
                ...paramsToPass,
                [name]: promptResult /* <- Note: Not need to detect parameter collision here because PromptTemplatePipeline checks logic consistency during construction */,
            };

            currentPtp = ptp.getFollowingPromptTemplate(currentPtp!.name);
        }

        // TODO:             <- We are assigning TOutputParams to TOutputParams, but we are not sure if it's correct, maybe check in runtime
        return paramsToPass as TOutputParams;
    };

    return ptpExecutor;
}

/**
 * Note: CreatePtpExecutorOptions are just connected to PtpExecutor so do not extract to types folder
 */
