import OpenAI from 'openai';
import { ImageGenerateParams } from 'openai/resources';
import { Writable } from 'type-fest';
import { Vector } from 'xyzt';
import { WebgptTaskProgress } from '../../../components/TaskInProgress/task/WebgptTaskProgress';
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

        // TODO: Maybe check here Dalle version

        if (!normalizedPrompt.size) {
            if (normalizedPrompt.model === 'dall-e-2') {
                normalizedPrompt.size = new Vector(512, 512);
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

        if (responseImage.revised_prompt) {
            normalizedPrompt.content = responseImage.revised_prompt;
        }

        return [
            {
                imageSrc,
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
