import ElevenLabs from 'elevenlabs-node';
import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidClientId } from '../../../utils/validators/isValidClientId';

export const config = {
    api: {
        responseLimit: '15mb' /* <- Note: To !!! */,
    },
};

/**
 * API endpoint to convert text to speech
 */
export default async function textToSpeechHandler(
    request: NextApiRequest,
    response: NextApiResponse /* <- TODO: [❄] What is the best way how to type non-json reposnses */,
) {
    //---------------
    // TODO: !! Put to every API endpoint
    // TODO: [🌺] Make middleware for this:
    const clientId = request.query.clientId; /* <- TODO: [🌺][1] Maybe pass clientId as header X-Client-Id */
    if (!isValidClientId(clientId) /* <- TODO: [🌺][2] Also check if the email of client is validated */) {
        return response.status(400).json(
            {
                message: 'You must pass valid clientId' /* <- TODO: [🌻] Unite wrong GET param message */,
            } as any /* <-[🌋] */,
        );
    }
    // TODO: [🌺] Log cost for this request and attribute it to the client
    //---------------

    // TODO: !!! Validate text/plain body

    const text = 'Ahoj'; //request.body;
    console.log(text);

    // TODO: !!! Validate text content

    const elevenLabs = new ElevenLabs({
        apiKey: '0e2c037kl8561005671b1de345s8765c', // Your API key from Elevenlabs
        voiceId: 'pNInz6obpgDQGcFmaJgB', // A Voice ID from Elevenlabs
    });

    const speech = elevenLabs.textToSpeech({
        // Required Parameters
        fileName: 'audio.mp3', // The name of your audio file
        textInput: text, // The text you wish to convert to speech

        // Optional Parameters
        // voiceId: '21m00Tcm4TlvDq8ikWAM', // A different Voice ID from the default
        stability: 0.5, // The stability for the converted speech
        similarityBoost: 0.5, // The similarity boost for the converted speech
        modelId: 'elevenlabs_multilingual_v2', // The ElevenLabs Model ID
        style: 1, // The style exaggeration for the converted speech
        speakerBoost: true, // The speaker boost for the converted speech
    });

    console.log(speech);

    return response
        .setHeader('Content-Type', 'audio/mpeg' /* <- !!! Which is the correct mime*/)
        .status(200)
        .end(speech);
}

/**
 * TODO: Maybe> response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
 */
