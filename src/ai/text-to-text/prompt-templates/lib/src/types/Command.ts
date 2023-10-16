import { string_name, string_version } from '../../../../../../utils/typeAliases';
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
    | {
          type: 'PARAMETER';
          parameterName: string_name;
      }
    | {
          type: 'INPUT_PARAMETER';
          parameterName: string_name;
      }
    | {
          type: 'OUTPUT_PARAMETER';
          parameterName: string_name;
      };

/**
 * TODO: [🧠] Best ACRY "param" vs "parameter"
 */
