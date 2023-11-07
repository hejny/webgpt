import { uuid } from '@promptbook/types';
import { ImageGenerator } from '../0-interfaces/ImageGenerator';
import { TextToImagePrompt } from '../0-interfaces/TextToImagePrompt';
import { TextToImagePromptResult } from '../0-interfaces/TextToImagePromptResult';
import { RemoteImageGeneratorResponse } from './createRemoteImageGeneratorRouteHandler';

/**
 * Image generator called remotely
 */
export class RemoteImageGenerator implements ImageGenerator {
    public constructor(private readonly clientId: uuid, private readonly subroute: string) {}

    public async generate(prompt: TextToImagePrompt): Promise<Array<TextToImagePromptResult>> {
        const response = await fetch(
            `/api/text-to-image/${this.subroute}?clientId=${
                /* <- TODO: [⛹️‍♂️] Send clientId through headers */
                this.clientId
            }`,
            {
                method: 'POST',
                body: JSON.stringify(prompt),
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        const responseJson = (await response.json()) as RemoteImageGeneratorResponse;

        console.log('!!!', responseJson);

        return responseJson.promptResult;
    }
}
