import { uuid } from '@promptbook/types';
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '../../../../config';
import { ImageGenerator } from '../0-interfaces/ImageGenerator';
import { TextToImagePromptResult } from '../0-interfaces/TextToImagePromptResult';
import { DallePrompt } from './DallePrompt';

/**
 * Dalle image generator by OpenAI
 */
export class DalleImageGenerator implements ImageGenerator {
    private readonly openai: OpenAI;

    public constructor(private readonly clientId: uuid) {
        this.openai = new OpenAI({
            apiKey: OPENAI_API_KEY,
        });
    }

    public async generate(prompt: DallePrompt): Promise<Array<TextToImagePromptResult>> {
        const response = await this.openai.images.generate({
            prompt: prompt.content,
            model: `dall-e-${prompt.dalleVersion}`,
            size: '1792x1024',
            // quality: 'standard',
            style: 'natural',
            user: this.clientId,
        });

        if (response.data.length !== 1) {
            throw new Error(`Expected 1 image, got ${response.data.length}`);
        }

        const responseImage = response.data[0]!;

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
