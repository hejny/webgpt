import { NaturalExecutionTools } from '@promptbook/core/esm/typings/execution/NaturalExecutionTools';
import { extractAllListItemsFromMarkdown } from '@promptbook/utils';
import { parseKeywordsFromString } from 'n12';
import spaceTrim from 'spacetrim';
import { WebgptTaskProgress } from '../../../components/TaskInProgress/task/WebgptTaskProgress';
import { SearchPhotobankResult } from '../../../pages/api/pregenerated-photobank/search';
import { throwIfErrorResponse } from '../../../utils/errors/ResponseWithError';
import { getExecutionTools } from '../../prompt-templates/getExecutionTools';
import { ImageGenerator } from '../0-interfaces/ImageGenerator';
import { ImagePrompt } from '../0-interfaces/ImagePrompt';
import { ImagePromptResult } from '../0-interfaces/ImagePromptResult';
import { PregeneratedPhotobankOptions } from './interfaces/PregeneratedPhotobankOptions';

/**
 *
 * @singleton
 */
export class PregeneratedPhotobank implements ImageGenerator {
    private readonly naturalExecutionTools: NaturalExecutionTools;

    public constructor(private readonly options: PregeneratedPhotobankOptions) {
        this.naturalExecutionTools = getExecutionTools(options.clientId).natural;
    }

    public async generate(
        prompt: ImagePrompt,
        onProgress: (taskProgress: WebgptTaskProgress) => void,
    ): Promise<Array<ImagePromptResult>> {
        if (this.options.isVerbose) {
            console.info(`📷 Generating image via photobank`);
        }

        const keywordsPromptResponse = await this.naturalExecutionTools.gptComplete({
            modelRequirements: {
                variant: 'COMPLETION',
                maxTokens: 150 /* <- TODO: !! Tweak */,
            },
            content: spaceTrim(
                (block) => `
                ${block(prompt.content)}

                    ## Keywords
                    - website
                
                `,
            ),
            ptbkUrl: '#keywords',
            parameters: {
                imagePrompt: prompt.content,
            },
        });

        /*
        TODO: Make ptbk from this
        TODO: THis is not working much:
            > Butterfly with green wings
            > Results in:
            > keywords [
            > 'branding',       'transformation',
            > 'growth',         'nature',
            > 'beauty',         'ecology',
            > 'sustainability', 'vibrant',
            > 'colorful',       'lively',
            > 'harmony',        'balance'
            > ]
        
        */

        const keywords = extractAllListItemsFromMarkdown(keywordsPromptResponse.content).flatMap(
            (item) => Array.from(parseKeywordsFromString(item)) /* <- Note: [7] */,
        );

        const response = await fetch(
            `/api/pregenerated-photobank/search?${keywords.map((keyword) => `keywords=${keyword}`).join('&')}`,
        );
        const rawResponse = (await response.json()) as SearchPhotobankResult;
        throwIfErrorResponse(rawResponse);

        const { images } = rawResponse;

        if (this.options.isVerbose) {
            console.info({
                prompt,
                keywordsPromptResponse,
                keywords,
                images,
                rawResponse,
            });
        }

        return images.map(({ src }) => ({
            imageSrc: src,
            originalPrompt: prompt,
            normalizedPrompt: {
                model: 'photobank',
                content: '' /* <- TODO: [⛹️‍♀️] Pass here original prompt */,
            },
            rawResponse,
        }));
    }
}

/**
 * TODO: !!! Annotate
 * TODO: !! Use taskProgress
 * TODO: Watch cost of LLM usage here
 * TODO: [🧠][7] Multiword keywords
 */
