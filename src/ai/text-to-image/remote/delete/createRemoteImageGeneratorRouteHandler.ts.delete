import type { NextApiRequest, NextApiResponse } from 'next';
import type { uuid } from '../../../utils/typeAliases';
import { isValidClientId } from '../../../utils/validators/isValidClientId';
import type { ImageGenerator } from '../0-interfaces/ImageGenerator';
import type { TextToImagePrompt } from '../0-interfaces/TextToImagePrompt';
import type { TextToImagePromptResult } from '../0-interfaces/TextToImagePromptResult';

export interface RemoteImageGeneratorResponse {
    // TODO: [🌋] ErrorableResponse
    readonly promptResult: Array<TextToImagePromptResult>;
}

interface CreateRemoteImageGeneratorRouteHandlerOptions {
    /**
     * Provides an image generator for a given client
     */
    createImageGenerator(clientId: uuid): ImageGenerator;
}

/**
 * Creates API endpoint handler to register new site into the system
 */
export function createRemoteImageGeneratorRouteHandler(options: CreateRemoteImageGeneratorRouteHandlerOptions) {
    const { createImageGenerator } = options;

    return async function registerHandler(
        request: NextApiRequest,
        response: NextApiResponse<RemoteImageGeneratorResponse>,
    ) {
        if (request.method !== 'POST') {
            return response.status(400).json({ message: 'Only POST method is allowed' } as any /* <-[🌋] */);
        }

        const clientId = request.query.clientId;

        if (!isValidClientId(clientId)) {
            return response.status(400).json(
                {
                    message:
                        'GET param clientId is not valid client ID' /* <- TODO: [🌻] Unite wrong GET param message */,
                } as any /* <-[🌋] */,
            );
        }

        const prompt = request.body as TextToImagePrompt;

        try {
            const imageGenerator = createImageGenerator(clientId);
            const promptResult = await imageGenerator.generate(prompt);

            return response.status(201).json({
                promptResult,
            } as RemoteImageGeneratorResponse);
        } catch (error) {
            if (!(error instanceof Error)) {
                throw error;
            }

            return response.status(500).json(
                {
                    message: error.message,
                } as any /* <-[🌋] */,
            );
        }
    };
}
