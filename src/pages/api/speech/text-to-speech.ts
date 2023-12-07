// import ElevenLabs from 'elevenlabs-node'; <- TODO: !!! Use OR uninstall
import type { NextApiRequest, NextApiResponse } from 'next';
import { ELEVENLABS_API_KEY, ELEVENLABS_VOICE_IDS } from '../../../../config';
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

    const text = 'He'; //request.body;
    console.log(text);

    // TODO: !!! Validate text content

    const voiceId = ELEVENLABS_VOICE_IDS['pavol'];

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'audio/mpeg',
            'xi-api-key': ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
            model_id: 'eleven_multilingual_v2', // <- !!! Pick the best
            text,
            voice_settings: {
                similarity_boost: 0.5, // <- !!! Pick the best
                stability: 0.5, // <- !!! Pick the best
                style: 1, // <- !!! Pick the best
                use_speaker_boost: true, // <- !!! Pick the best
            },
        }),
    };

    const speechResponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, options);

    const speechResponseBlob = await speechResponse.blob();

    return response.setHeader('Content-Type', 'audio/mpeg').send(speechResponseBlob);
}

/**
 * TODO: Maybe> response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
 */
