import { describe, expect, it } from '@jest/globals';
import { parseCommand } from './parseCommand';

describe('how parseCommand works', () => {
    it('should fail parsing PTP_VERSION command', () => {
        expect(() => parseCommand('PTP version')).toThrowError();
        expect(() => parseCommand('PTP version   ')).toThrowError();
        // TODO: Also test invalid version in PTP_VERSION command
    });

    it('should parse EXECUTE command', () => {
        expect(parseCommand('execute prompt template')).toEqual({
            type: 'EXECUTE',
            executionType: 'PROMPT_TEMPLATE',
        });
        expect(parseCommand('execute simple template')).toEqual({
            type: 'EXECUTE',
            executionType: 'SIMPLE_TEMPLATE',
        });
        expect(parseCommand('execute script')).toEqual({
            type: 'EXECUTE',
            executionType: 'SCRIPT',
        });
        expect(parseCommand('execute prompt dialog')).toEqual({
            type: 'EXECUTE',
            executionType: 'PROMPT_DIALOG',
        });
        expect(parseCommand('  execute    prompt         template')).toEqual({
            type: 'EXECUTE',
            executionType: 'PROMPT_TEMPLATE',
        });
        expect(parseCommand('execute PROMPT_TEMPLATE')).toEqual({
            type: 'EXECUTE',
            executionType: 'PROMPT_TEMPLATE',
        });
        expect(parseCommand('execute `prompt template`')).toEqual({
            type: 'EXECUTE',
            executionType: 'PROMPT_TEMPLATE',
        });
    });

    it('should fail parsing EXECUTE command', () => {
        expect(() => parseCommand('execute fooo')).toThrowError();
        expect(() => parseCommand('execute script prompt template')).toThrowError();
    });

    it('should parse USE command', () => {
        expect(parseCommand('use chat')).toEqual({
            type: 'USE',
            key: 'variant',
            value: 'CHAT',
        });
        expect(parseCommand('use completion')).toEqual({
            type: 'USE',
            key: 'variant',
            value: 'COMPLETION',
        });
        expect(parseCommand('use CHAT')).toEqual({
            type: 'USE',
            key: 'variant',
            value: 'CHAT',
        });
        expect(parseCommand('use `CHAT`')).toEqual({
            type: 'USE',
            key: 'variant',
            value: 'CHAT',
        });

        /*
        TODO: [🌚]
        expect(parseCommand('use GPT-3.5')).toEqual({
            type: 'USE',
            key: 'variant',
            value: 'CHAT',
        });
        */
    });

    it('should fail parsing USE command', () => {
        expect(() => parseCommand('use wet')).toThrowError();
        expect(() => parseCommand('use {script}')).toThrowError();
    });

    it('should parse PTP_VERSION command', () => {
        expect(parseCommand('ptp version 1.0.0')).toEqual({
            type: 'PTP_VERSION',
            ptpVersion: '1.0.0',
        });
        expect(parseCommand('PTP version 1.0.0')).toEqual({
            type: 'PTP_VERSION',
            ptpVersion: '1.0.0',
        });
    });

    it('should parse PARAMETER command', () => {
        expect(parseCommand('parameter {name} Name for the hero')).toEqual({
            type: 'PARAMETER',
            isInputParameter: false,
            parameterName: 'name',
            parameterDescription: 'Name for the hero',
        });
        expect(parseCommand('{name} Name for the hero')).toEqual({
            type: 'PARAMETER',
            isInputParameter: false,
            parameterName: 'name',
            parameterDescription: 'Name for the hero',
        });
        expect(parseCommand('> {name} Name for the hero')).toEqual({
            type: 'PARAMETER',
            isInputParameter: false,
            parameterName: 'name',
            parameterDescription: 'Name for the hero',
        });
        expect(parseCommand('{name} Input for the hero')).toEqual({
            type: 'PARAMETER',
            isInputParameter: false,
            parameterName: 'name',
            parameterDescription: 'Input for the hero',
        });
        expect(parseCommand('input parameter {name} Name for the hero')).toEqual({
            type: 'PARAMETER',
            isInputParameter: true,
            parameterName: 'name',
            parameterDescription: 'Name for the hero',
        });
        expect(parseCommand('input parameter {name}')).toEqual({
            type: 'PARAMETER',
            isInputParameter: true,
            parameterName: 'name',
            parameterDescription: null,
        });
        expect(parseCommand('input   parameter {name}          ')).toEqual({
            type: 'PARAMETER',
            isInputParameter: true,
            parameterName: 'name',
            parameterDescription: null,
        });

        expect(parseCommand('OUTPUT parameter {name} Name for the hero')).toEqual({
            type: 'PARAMETER',
            isInputParameter: false,
            parameterName: 'name',
            parameterDescription: 'Name for the hero',
        });
        expect(parseCommand('   parameter    {name}        Name for the hero         ')).toEqual({
            type: 'PARAMETER',
            isInputParameter: false,
            parameterName: 'name',
            parameterDescription: 'Name for the hero',
        });
        expect(parseCommand('parameter {name} **Name** for the hero')).toEqual({
            type: 'PARAMETER',
            isInputParameter: false,
            parameterName: 'name',
            parameterDescription: '**Name** for the hero',
        });
        expect(parseCommand('parameter {name} **Name** for `the` {')).toEqual({
            type: 'PARAMETER',
            isInputParameter: false,
            parameterName: 'name',
            parameterDescription: '**Name** for `the` {',
        });
    });

    it('should parse POSTPROCESS command', () => {
        expect(parseCommand('Postprocess spaceTrim')).toEqual({
            type: 'POSTPROCESS',
            functionName: 'spaceTrim',
        });
        expect(parseCommand('Postprocess `spaceTrim`')).toEqual({
            type: 'POSTPROCESS',
            functionName: 'spaceTrim',
        });
        expect(parseCommand('Postprocess **spaceTrim**')).toEqual({
            type: 'POSTPROCESS',
            functionName: 'spaceTrim',
        });
        expect(parseCommand('Post-process spaceTrim')).toEqual({
            type: 'POSTPROCESS',
            functionName: 'spaceTrim',
        });
        expect(parseCommand('Postprocessing unwrapResult')).toEqual({
            type: 'POSTPROCESS',
            functionName: 'unwrapResult',
        });
    });

    it('should fail parsing POSTPROCESS command', () => {
        expect(() => parseCommand('Postprocess spaceTrim unwrapResult')).toThrowError;
        expect(() => parseCommand('Process spaceTrim')).toThrowError;
        expect(() => parseCommand('Postprocess')).toThrowError;
    });

    it('should fail parsing PARAMETER command', () => {
        expect(() => parseCommand('parameter {}')).toThrowError();
        expect(() => parseCommand('parameter { name }')).toThrowError();
        expect(() => parseCommand('parameter name')).toThrowError();
        expect(() => parseCommand('parameter {name} {name}')).toThrowError();
        expect(() => parseCommand('parameter {name} {name} Name for the hero')).toThrowError();
        expect(() => parseCommand('parameter {name} Name for the hero {name}')).toThrowError();
        expect(() => parseCommand('parameter {name} Name for the hero {name} Name for the hero')).toThrowError();
        expect(() => parseCommand('parmeter {name} Name for the hero')).toThrowError();
    });

    it('should fail parsing multiline command', () => {
        expect(() => parseCommand('execute\nprompt template')).toThrowError();
        expect(() => parseCommand('execute prompt template\n')).toThrowError();
    });
});
