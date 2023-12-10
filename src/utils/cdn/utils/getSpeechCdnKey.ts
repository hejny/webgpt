import { string_name } from '@promptbook/types';
import { normalizeToKebabCase } from 'n12';
import { string_uri } from '../../typeAliases';
import { nameToSubfolderPath } from './nameToSubfolderPath';

/**
 * Generates a path for the prepared hardcoded content
 */
export function getSpeechCdnKey(voiceName: string_name, text: string): string_uri {
    const normalizedText = normalizeToKebabCase(text);

    // TODO: [⛳️] Probbably prefix should be in this config not on the consumer side
    return `speech/${voiceName}/${nameToSubfolderPath(normalizedText).join('/')}/${normalizedText}.mp3`;
}
