import { string_markdown_text, string_name, string_version } from '../../../../../../utils/typeAliases';
import { ExecutionType } from './ExecutionTypes';
import { ModelRequirements } from './ModelRequirements';

/**
 * Command is one piece of the prompt template which adds some logic to the prompt template or the whole pipeline.
 * It is parsed from the markdown from ul/ol items - one command per one item.
 */
export type Command =
    | {
          type: 'EXECUTE';
          executionType: ExecutionType;
      }
    | {
          type: 'USE';
          key: keyof ModelRequirements;
          value: any /* <- TODO: Infer from used key, can it be done in TypeScript */;
      }
    | {
          type: 'PTP_VERSION';
          ptpVersion: string_version;
      }
    | ParameterCommand;

// TODO: !!!last Split + annotate each command

export interface ParameterCommand {
    type: 'PARAMETER';
    isInputParameter: boolean;
    parameterName: string_name;
    parameterDescription: string_markdown_text;
}

/**
 * TODO: [🧠] Best ACRY "param" vs "parameter"
 */
