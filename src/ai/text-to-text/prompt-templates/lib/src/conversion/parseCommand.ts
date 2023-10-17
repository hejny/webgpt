import { normalizeTo_SCREAMING_CASE } from 'n12';
import spaceTrim from 'spacetrim';
import { string_markdown } from '../../../../../../utils/typeAliases';
import { Command } from '../types/Command';
import { ExecutionTypes } from '../types/ExecutionTypes';

/**
 * Parses one line of ul/ol to command
 */
export function parseCommand(listItem: string_markdown): Command {
    let type = listItem.trim();
    type = type.split('`').join('');
    type = type.split('"').join('');
    type = type.split("'").join('');
    type = type.split('~').join('');
    type = type.split('[').join('');
    type = type.split(']').join('');
    type = type.split('(').join('');
    type = type.split(')').join('');
    type = normalizeTo_SCREAMING_CASE(type);

    if (type.startsWith('EXECUTE')) {
        const executionType = ExecutionTypes.find((executionType) => type.includes(executionType));

        if (!executionType) {
            throw new Error(
                spaceTrim(
                    (block) => `
                        Unknown execution type in command:

                        - ${listItem}

                        Supported execution types are:
                        ${block(ExecutionTypes.join(', '))}
                    `,
                ),
            );
        }

        return {
            type: 'EXECUTE',
            executionType,
        };
    } else if (type.startsWith('USE')) {
        // TODO: Make this more elegant and dynamically
        if (type.includes('CHAT')) {
            return {
                type: 'USE',
                key: 'variant',
                value: 'CHAT',
            };
        } else if (type.includes('COMPLETION')) {
            return {
                type: 'USE',
                key: 'variant',
                value: 'COMPLETION',
            };
        } else {
            throw new Error(
                spaceTrim(
                    (block) => `
                        Unknown variant in command:

                        - ${listItem}

                        Supported variants are:
                        ${block(['CHAT', 'COMPLETION'].join(', '))}
                    `,
                ),
            );
        }
    } else if (type.startsWith('PARAM') || type.startsWith('{')) {
        const parametersMatch = listItem.match(
            /\{(?<parameterName>[a-z0-9_]+)\}[^\S\r\n]*(?<parameterDescription>.*)$/im,
        );

        if (
            !parametersMatch ||
            !parametersMatch.groups ||
            !parametersMatch.groups.parameterName ||
            !parametersMatch.groups.parameterDescription
        ) {
            throw new Error(
                spaceTrim(
                    (block) => `
                        Invalid parameter in command:

                        - ${block(listItem)}
                    `,
                ),
            );
        }

        const { parameterName, parameterDescription } = parametersMatch.groups as any;

        const isInputParameter = type.includes('INPUT');

        return {
            type: 'PARAMETER',
            parameterName,
            parameterDescription,
            isInputParameter,
        };
    } else {
        throw new Error(
            spaceTrim(
                (block) => `
                    Unknown command:

                    - ${listItem}

                    Supported commands are:
                    ${block(ExecutionTypes.join(', '))}
                `,
            ),
        );
    }
}
