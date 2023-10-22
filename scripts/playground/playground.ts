#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

import chalk from 'chalk';
import { join } from 'path';
import spaceTrim from 'spacetrim';
import { PromptTemplatePipeline } from '../../src/ai/text-to-text/prompt-templates/lib/src/classes/PromptTemplatePipeline';
import { promptTemplatePipelineStringToJson } from '../../src/ai/text-to-text/prompt-templates/lib/src/conversion/promptTemplatePipelineStringToJson';
import { createPtpExecutor } from '../../src/ai/text-to-text/prompt-templates/lib/src/execution/createPtpExecutor';
import { MockedEchoNaturalExecutionTools } from '../../src/ai/text-to-text/prompt-templates/lib/src/execution/plugins/natural-execution-tools/mocked/MockedEchoNaturalExecutionTools';
import { JavascriptEvalExecutionTools } from '../../src/ai/text-to-text/prompt-templates/lib/src/execution/plugins/script-execution-tools/javascript/JavascriptEvalExecutionTools';
import { CallbackInterfaceTools } from '../../src/ai/text-to-text/prompt-templates/lib/src/execution/plugins/user-interface-execution-tools/callback/CallbackInterfaceTools';
import { PromptTemplatePipelineString } from '../../src/ai/text-to-text/prompt-templates/lib/src/types/PromptTemplatePipelineString';
// import { OPENAI_API_KEY, SYSTEM_AUTHOR_ID } from '../../config';
// import { SupabaseLoggerWrapperOfNaturalExecutionTools } from '../../src/ai/text-to-text/prompt-templates/lib/src/execution/plugins/natural-execution-tools/logger/SupabaseLoggerWrapperOfNaturalExecutionTools';
// import { OpenAiExecutionTools } from '../../src/ai/text-to-text/prompt-templates/lib/src/execution/plugins/natural-execution-tools/openai/OpenAiExecutionTools';
// import { ptpLibrary } from '../../src/ai/text-to-text/prompt-templates/ptpLibrary';
// import { ChatThread } from '../../src/ai/text-to-text/ChatThread';

if (process.cwd() !== join(__dirname, '../..')) {
    console.error(chalk.red(`CWD must be root of the project`));
    process.exit(1);
}

playground()
    .catch((error) => {
        console.error(chalk.bgRed(error.name));
        console.error(error);
        process.exit(1);
    })
    .then(() => {
        process.exit(0);
    });

async function playground() {
    console.info(`🧸  Playground`);

    // Do here stuff you want to test
    //========================================>
    const ptpJson = promptTemplatePipelineStringToJson(
        spaceTrim(`
            # Sample prompt

            Show how to use a simple prompt with no parameters.
            
            -   PTP version 1.0.0
            -   Input parameter {yourName} Name of the hero
            
            ## Question

            -   Postprocess reverse
            -   Postprocess removeDiacritics
            -   Postprocess normalizeTo_SCREAMING_CASE
            
            \`\`\`markdown
            Hello {yourName}!
            \`\`\`
            
            -> {greeting}
         `) as PromptTemplatePipelineString,
    );

    const ptp = PromptTemplatePipeline.fromJson(ptpJson);
    const ptpExecutor = createPtpExecutor({
        ptp,
        tools: {
            natural: new MockedEchoNaturalExecutionTools({ isVerbose: true }),
            script: [new JavascriptEvalExecutionTools({ isVerbose: true })],
            userInterface: new CallbackInterfaceTools({
                isVerbose: true,
                async callback() {
                    return 'Hello';
                },
            }),
        },
    });

    const result = await ptpExecutor({ yourName: 'DAVID' }, () => {});

    console.info(result);

    //========================================/

    console.info(`[ Done 🧸  Playground ]`);
}
