import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';
import { CognitiveServicesCredentials } from '@azure/ms-rest-azure-js';
import { AZURE_COMPUTER_VISION_ENDPOINT, AZURE_COMPUTER_VISION_KEY } from '../../../config';
import { image_description } from '../../utils/typeAliases';

/**
 * Analyzes an image through the Azure Computer vision API
 *
 * Note: This function is aviable only on the server
 *
 * @param image
 */
export async function imageToText(imageUrl: URL): Promise<Exclude<image_description, JSX.Element>> {
    const cognitiveServiceCredentials = new CognitiveServicesCredentials(AZURE_COMPUTER_VISION_KEY!);
    const client = new ComputerVisionClient(cognitiveServiceCredentials, AZURE_COMPUTER_VISION_ENDPOINT!.href);

    const describeResult = await client.describeImage(imageUrl.href, {
        maxCandidates: 1,
        language: 'en',
    });

    const caption = (describeResult.captions || [])[0];

    if (!caption || !caption.text) {
        throw new Error('No caption found');
    }

    return caption.text;
}

/**
 * TODO: Maybe allow to pass a Buffer | File | Blob
 */
