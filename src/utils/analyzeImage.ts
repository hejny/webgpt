import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';
import { CognitiveServicesCredentials } from '@azure/ms-rest-azure-js';
import { AZURE_COMPUTER_VISION_ENDPOINT, AZURE_COMPUTER_VISION_KEY } from '../../config';
import { isRunningInNode } from './isRunningInWhatever';

export type IAnalyzeResult = any;

/**
 * Analyzes an image through the Azure Computer vision API
 *
 * Note: This function is aviable only on the server
 *
 * @param image
 */
export async function analyzeImage(imageUrl: URL): Promise<IAnalyzeResult> {
    if (!isRunningInNode()) {
        throw new Error('analyzeImage is only available on the server');
    }
    const cognitiveServiceCredentials = new CognitiveServicesCredentials(AZURE_COMPUTER_VISION_KEY!);
    const client = new ComputerVisionClient(cognitiveServiceCredentials, AZURE_COMPUTER_VISION_ENDPOINT!.href);

    const analyzeResult = await client.analyzeImage(imageUrl.href, {
        maxCandidates: 5,
        language: 'en',
    });

    const describeResult = await client.describeImage(imageUrl.href, {
        maxCandidates: 5,
        language: 'en',
    });

    const tagResult = await client.tagImage(imageUrl.href, {
        maxCandidates: 5,
        language: 'en',
    });

    const detectResult = await client.detectObjects(imageUrl.href, {
        maxCandidates: 5,
        language: 'en',
    });

    return { analyzeResult, describeResult, tagResult, detectResult };
}

/**
 * TODO: [💁‍♂️] Maybe allow to pass a Buffer | File | Blob
 */
