import { parseKeywordsFromString } from 'n12';
import { SearchPhotobankResult } from '../../../pages/api/pregenerated-photobank/search';
import { TextToImagePrompt } from '../interfaces/TextToImagePrompt';
import { TextToImagePromptResult } from '../interfaces/TextToImagePromptResult';
import { ImageGenerator } from '../interfaces/ImageGenerator';
import { uuid } from '@promptbook/types';
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '../../../../config';



interface TextToImagePrompt


/**
 * !!!
 */
export class Dalle implements ImageGenerator {

    private readonly openai: OpenAI;
  
    private constructor(private readonly clientId: uuid) {
        const openai = new OpenAI({
            apiKey: OPENAI_API_KEY,
        });
    
    }

    public async generate(prompt: TextToImagePrompt): Promise<Array<TextToImagePromptResult>> {


        const generatedImage = await this.openai.images.generate({
            prompt: prompt.content,
            model: 'dall-e-3',
            size: '1792x1024',
            // quality: 'standard',
            style: 'natural',
            user: 'playground',
        });
    }
}

/**
 * TODO: Annotate
 * TODO: Implement
 *
 */
