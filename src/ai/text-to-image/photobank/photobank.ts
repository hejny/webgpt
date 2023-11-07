import { parseKeywordsFromString } from 'n12';
import { SearchPhotobankResult } from '../../../pages/api/pregenerated-photobank/search';
import { ImageGenerator } from '../0-interfaces/ImageGenerator';
import { TextToImagePrompt } from '../0-interfaces/TextToImagePrompt';
import { TextToImagePromptResult } from '../0-interfaces/TextToImagePromptResult';

/**
 *
 * @singleton
 */
export class PregeneratedPhotobank implements ImageGenerator {
    private static instance: PregeneratedPhotobank;

    public static getInstance() {
        if (!PregeneratedPhotobank.instance) {
            PregeneratedPhotobank.instance = new PregeneratedPhotobank();
        }

        return PregeneratedPhotobank.instance;
    }

    private constructor() {}

    public async generate(prompt: TextToImagePrompt): Promise<Array<TextToImagePromptResult>> {
        const keywords = parseKeywordsFromString(prompt.content);

        // TODO: !!! Filter out void keywords

        const response = await fetch(
            `/api/pregenerated-photobank/search?${Array.from(keywords)
                .map((keyword) => `keywords=${keyword}`)
                .join('&')}`,
        );
        const { images } = (await response.json()) as SearchPhotobankResult;

        return images.map(({ src }) => ({ imageSrc: src, originalPrompt: prompt }));
    }
}

/**
 * TODO: !!! Annotate
 * TODO: !!! Implement
 *
 */
