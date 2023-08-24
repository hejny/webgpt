import { AZURE_COMPUTER_VISION_ENDPOINT, AZURE_COMPUTER_VISION_KEY } from '../../config';
import { isRunningInNode } from './isRunningInWhatever';

interface IAzureCognitiveVisionAnalyze {}

/**
 * Analyzes an image through the Azure Computer vision API
 *
 * Note: This function is aviable only on the server
 *
 * @param image
 */
export async function analyzeImage(image: Buffer): Promise<any /* <- !!! */> {
    if (!isRunningInNode()) {
        throw new Error('analyzeImage is only available on the server');
    }

    const response = await fetch(`${AZURE_COMPUTER_VISION_ENDPOINT!.href}vision/v2.0/analyze`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': AZURE_COMPUTER_VISION_KEY!,
        },
        body: image,
    });

    const result = await response.json();

    return result;
}

/**
 * TODO: Maybe allow to pass a File | Blob
 */
