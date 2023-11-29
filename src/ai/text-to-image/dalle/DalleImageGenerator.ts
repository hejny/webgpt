import fetch from 'node-fetch';
import OpenAI from 'openai';
import { ImageGenerateParams } from 'openai/resources';
import spaceTrim from 'spacetrim';
import { Writable } from 'type-fest';
import { Vector } from 'xyzt';
import { CDN } from '../../../../config';
import { WebgptTaskProgress } from '../../../components/TaskInProgress/task/WebgptTaskProgress';
import { generateDalleCdnKey } from '../../../utils/cdn/utils/generateDalleCdnKey';
import { isRunningInNode } from '../../../utils/isRunningInWhatever';
import type { ImageGenerator } from '../0-interfaces/ImageGenerator';
import type { ImagePromptResult } from '../0-interfaces/ImagePromptResult';
import type { DalleImageGeneratorOptions } from './interfaces/DalleImageGeneratorOptions';
import type { DallePrompt } from './interfaces/DallePrompt';

/**
 * Dalle image generator by OpenAI
 */
export class DalleImageGenerator implements ImageGenerator {
    private readonly openai: OpenAI;

    public constructor(private readonly options: DalleImageGeneratorOptions) {
        if (!isRunningInNode()) {
            throw new Error('DalleImageGenerator is available only in server/node, use RemoteImageGenerator instead');
        }

        this.openai = new OpenAI({
            apiKey: options.openAiApiKey,
        });
    }

    public async generate(
        prompt: DallePrompt,
        onProgress: (taskProgress: WebgptTaskProgress) => void,
    ): Promise<Array<ImagePromptResult>> {
        const originalPrompt = prompt;
        const normalizedPrompt: Writable<DallePrompt> = { ...prompt };

        if (normalizedPrompt.model === 'dalle-2') {
            normalizedPrompt.model = 'dall-e-2';
        } else if (normalizedPrompt.model === 'dalle-3') {
            normalizedPrompt.model = 'dall-e-3';
        }

        if (this.options.isVerbose) {
            console.info(
                spaceTrim(
                    (block) => `
                        👨‍🎨 Generating image via ${normalizedPrompt.model}

                        ${block(originalPrompt.content)}
                    `,
                ),
            );
        }

        // TODO: Maybe check here Dalle version

        if (!normalizedPrompt.size) {
            if (normalizedPrompt.model === 'dall-e-2') {
                normalizedPrompt.size = new Vector(1024, 1024);
            } else if (normalizedPrompt.model === 'dall-e-3') {
                normalizedPrompt.size = new Vector(1792, 1024);
            } else {
                throw new Error(`Unknown Dalle version ${normalizedPrompt.model}`);
            }
        }

        normalizedPrompt.size = Vector.fromObject(normalizedPrompt.size || {});

        const rawRequest = {
            prompt: normalizedPrompt.content,
            model: normalizedPrompt.model,
            size: `${normalizedPrompt.size.x}x${normalizedPrompt.size.y}`,
            user: this.options.user,
            ...normalizedPrompt.modelSettings,
        } as ImageGenerateParams;

        const rawResponse = await this.openai.images.generate(rawRequest);

        if (rawResponse.data.length !== 1) {
            throw new Error(`Expected 1 image, got ${rawResponse.data.length}`);
        }

        const responseImage = rawResponse.data[0]!;

        const imageSrc = responseImage.url;

        if (!imageSrc) {
            throw new Error(`The image src is empty`);
        }

        const imageArrayBuffer = await fetch(imageSrc).then((response) => response.arrayBuffer());
        const imageBuffer = Buffer.from(imageArrayBuffer);

        const key = generateDalleCdnKey(prompt, imageBuffer);
        await CDN.setItem(key, {
            type: 'image/png', // <- TODO: Is Dalle always creating PNGs?
            data: imageBuffer,
        });

        const imageUrl = CDN.getItemUrl(key);

        if (responseImage.revised_prompt) {
            normalizedPrompt.content = responseImage.revised_prompt;
        }

        if (this.options.isVerbose) {
            console.info(
                spaceTrim(`
                    👨‍🎨 Image generated
                    
                    ${imageSrc}
                `),
            );
        }

        return [
            {
                imageSrc: imageUrl.href /* <- Note: this is intended, we want to pass ahead the URL on our CDN
                                              NOT the temporary one provided by Dalle */,
                originalPrompt,
                normalizedPrompt,
                rawResponse,
            },
        ];
    }
}

/**
 * TODO: Annotate
 * TODO: Implement
 * TODO: !! Use taskProgress
 */
