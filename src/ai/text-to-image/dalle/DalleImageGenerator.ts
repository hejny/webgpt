import { uuid } from '@promptbook/types';
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '../../../../config';
import { isRunningInNode } from '../../../utils/isRunningInWhatever';
import { ImageGenerator } from '../0-interfaces/ImageGenerator';
import { TextToImagePromptResult } from '../0-interfaces/TextToImagePromptResult';
import { DallePrompt } from './DallePrompt';

/**
 * Dalle image generator by OpenAI
 */
export class DalleImageGenerator implements ImageGenerator {
    private readonly openai: OpenAI;

    public constructor(private readonly clientId: uuid) {
        if (!isRunningInNode()) {
            throw new Error('DalleImageGenerator is available only in server/node, use RemoteImageGenerator instead');
        }

        this.openai = new OpenAI({
            apiKey: OPENAI_API_KEY,
        });
    }

    public async generate(prompt: DallePrompt): Promise<Array<TextToImagePromptResult>> {
        console.log('!!!', { prompt });

        let size: string;

        if (prompt.dalleVersion === 2) {
            size = '512x512';
        } else if (prompt.dalleVersion === 3) {
            size = '1792x1024';
        } else {
            throw new Error(`Unknown Dalle version ${prompt.dalleVersion}`);
        }

        const rawRequest = {
            prompt: prompt.content,
            model: `dall-e-${prompt.dalleVersion}`,
            size: size as any /* <- !!! Remove any */,
            // quality: 'standard',
            style: 'natural',
            user: this.clientId,
        } as const;

        console.log('!!!', { rawRequest });

        const rawResponse = await this.openai.images.generate(rawRequest);

        console.log('!!!', { rawResponse });

        if (rawResponse.data.length !== 1) {
            throw new Error(`Expected 1 image, got ${rawResponse.data.length}`);
        }

        const responseImage = rawResponse.data[0]!;

        const imageSrc = responseImage.url;

        if (!imageSrc) {
            throw new Error(`The image src is empty`);
        }

        let normalizedPrompt: DallePrompt | undefined = undefined;

        if (responseImage.revised_prompt) {
            normalizedPrompt = {
                content: responseImage.revised_prompt,
                dalleVersion: prompt.dalleVersion,
                style: prompt.style,
            };
        }

        // TODO: !!! SupabaseLoggerWrapperOfImageGenerator
        // TODO: !!!! Save image to supabase

        return [
            {
                imageSrc,
                originalPrompt: prompt,
                normalizedPrompt,
            },
        ];
    }
}

/**
 * TODO: Annotate
 * TODO: Implement
 *
 */
