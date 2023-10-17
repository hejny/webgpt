import { string_markdown_text, string_name, string_version } from '../../../../../../utils/typeAliases';
import { ExecutionType } from './ExecutionTypes';
import { ModelRequirements } from './ModelRequirements';

/**
 * Command is one piece of the prompt template which adds some logic to the prompt template or the whole pipeline.
 * It is parsed from the markdown from ul/ol items - one command per one item.
 */
export type Command = ExecuteCommand | UseCommand | PtpVersionCommand | ParameterCommand;

/**
 * Execute command tells how to execute the section
 * It can be either prompt template, script or simple template etc.
 */
export interface ExecuteCommand {
    type: 'EXECUTE';
    executionType: ExecutionType;
}

/**
 * Use command tells which model and modelRequirements to use for the prompt template. execution
 */
export interface UseCommand {
    type: 'USE';
    key: keyof ModelRequirements;
    value: any /* <- TODO: Infer from used key, can it be done in TypeScript */;
}

/**
 * PtpVersion command tells which version is .ptp file using
 *
 * - It is used for backward compatibility
 * - It is defined per whole .ptp file in the header
 */
export interface PtpVersionCommand {
    type: 'PTP_VERSION';
    ptpVersion: string_version;
}

/**
 * Parameter command describes one parameter of the prompt template
 *
 * - It can tell if it is input or output parameter
 * - It can have description
 * - In description it can have simple formatting BUT not markdown structure or reference to other parameters
 */
export interface ParameterCommand {
    type: 'PARAMETER';
    isInputParameter: boolean;
    parameterName: string_name;
    parameterDescription: string_markdown_text | null;
}

/**
 * TODO: [🧠] Best ACRY "param" vs "parameter"
 */
