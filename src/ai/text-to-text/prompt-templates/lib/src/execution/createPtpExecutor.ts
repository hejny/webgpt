import spaceTrim from 'spacetrim';
import { Promisable } from 'type-fest';
import { TaskProgress } from '../../../../../../components/TaskInProgress/task/TaskProgress';
import { string_name } from '../../../../../../utils/typeAliases';
import { PromptTemplatePipeline } from '../classes/PromptTemplatePipeline';

import { PromptTemplateJson } from '../types/PromptTemplatePipelineJson/PromptTemplateJson';
import { replaceParameters } from '../utils/replaceParameters';
import { ExecutionTools } from './ExecutionTools';
import { PtpExecutor } from './PtpExecutor';

interface CreatePtpExecutorOptions {
    readonly ptp: PromptTemplatePipeline;
    readonly tools: ExecutionTools;
}

/**
 * Creates executor function from prompt template pipeline and execution tools.
 *
 * Note: Consider using getExecutor method of the library instead of using this function
 */
export function createPtpExecutor(options: CreatePtpExecutorOptions): PtpExecutor {
    const { ptp, tools } = options;

    const ptpExecutor = async (
        inputParameters: Record<string_name, string>,
        onProgress?: (taskProgress: TaskProgress) => Promisable<void>,
    ) => {
        let parametersToPass: Record<string_name, string> = inputParameters;
        let currentPtp: PromptTemplateJson | null = ptp.entryPromptTemplate;

        while (currentPtp !== null) {
            console.log('!!! currentPtp', currentPtp);
            const { name, description } = ptp.getResultingParameter(currentPtp.name);

            if (onProgress) {
                await onProgress({
                    name: `ptp-executor-frame-${name}`,
                    title: `🖋 ${description}`,
                    isDone: false,
                });
            }

            let promptResult: string | null = null;

            executionType: switch (currentPtp.executionType) {
                case 'SIMPLE_TEMPLATE':
                    promptResult = replaceParameters(currentPtp.content, parametersToPass);
                    break executionType;

                case 'PROMPT_TEMPLATE':
                    const prompt = {
                        ptpUrl: '!!!',
                        parameters: parametersToPass,
                        content: replaceParameters(currentPtp.content, parametersToPass),
                        modelRequirements: currentPtp.modelRequirements!,
                    };
                    variant: switch (currentPtp.modelRequirements!.variant) {
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
                            throw new Error(`Unknown model variant "${currentPtp.modelRequirements!.variant}"`);
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

                    scripts: for (const scriptTools of tools.script) {
                        try {
                            promptResult = await scriptTools.execute({
                                scriptLanguage: currentPtp.contentLanguage,
                                script: currentPtp.content,
                                parameters: parametersToPass,
                            });
                            isSuccessful = true;

                            break scripts;
                        } catch (error) {
                            if (!(error instanceof Error)) {
                                throw error;
                            }

                            errors.push(error);
                        }
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

                    // Note: This line is unreachable because of the break executionType above
                    break executionType;

                case 'PROMPT_DIALOG':
                    promptResult = await tools.userInterface.promptDialog({
                        prompt: replaceParameters(currentPtp.description || '', parametersToPass),
                        defaultValue: replaceParameters(currentPtp.content, parametersToPass),

                        // TODO: [🧠] !! Figure out how to define placeholder in .ptp.md file
                        placeholder: undefined,
                    });
                    break executionType;

                default:
                    throw new Error(`Unknown execution type "${(currentPtp as any).executionType}"`);
            }

            if (promptResult === null) {
                //              <- TODO: [🥨] Make some NeverShouldHappenError
                throw new Error(`Something went wrong and prompt result is null`);
            }

            if (onProgress) {
                onProgress({
                    name: `ptp-executor-frame-${name}`,
                    isDone: true,
                });
            }

            parametersToPass = {
                ...parametersToPass,
                [name]: promptResult /* <- Note: Not need to detect parameter collision here because PromptTemplatePipeline checks logic consistency during construction */,
            };

            currentPtp = ptp.getFollowingPromptTemplate(currentPtp!.name);
        }

        return parametersToPass as Record<string_name, string>;
    };

    return ptpExecutor;
}

/**
 * Note: CreatePtpExecutorOptions are just connected to PtpExecutor so do not extract to types folder
 */
