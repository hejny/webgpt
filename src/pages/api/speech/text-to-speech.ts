// import ElevenLabs from 'elevenlabs-node'; <- TODO: !!! Use OR uninstall
import { createReadStream, createWriteStream } from 'fs';
import { mkdir } from 'fs/promises';
import { normalizeToKebabCase } from 'n12';
import type { NextApiRequest, NextApiResponse } from 'next';
// !!! import fetch from 'node-fetch';
import { dirname, join } from 'path';
import spaceTrim from 'spacetrim';
import { Readable } from 'stream';
import { finished } from 'stream/promises';
import { ADMIN_EMAIL, ELEVENLABS_API_KEY, ELEVENLABS_VOICE_IDS } from '../../../../config';
import { isFileExisting } from '../../../../scripts/utils/isFileExisting';
import { isValidClientId } from '../../../utils/validators/isValidClientId';

// TODO: !!! To config + !!! Note NOT cache dir
const AUDIO_MATERIALIZE_DIR = join(process.cwd(), 'audio');

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
    if (request.method !== 'POST') {
        return response.status(400).json({ message: 'Only POST method is allowed' } as any /* <-[🌋] */);
    }

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

    // TODO: !!! Validate MIME-TYPE to text/plain body

    const contentType = (
        (request.headers['Content-Type'] as string) || (request.headers['content-type'] as string)
    ).split(';')[0];

    if (contentType !== 'text/plain') {
        return response.status(400).json(
            {
                message: `The Content-Type header must be "text/plain", but it is "${contentType}"`,
            } as any /* <-[🌋] */,
        );
    }

    const accept = request.headers['Accept'] || request.headers['accept'];

    if (accept !== 'audio/mpeg') {
        return response.status(400).json(
            {
                message: `The Accept header must be "audio/mpeg", but it is "${accept}"`,
            } as any /* <-[🌋] */,
        );
    }

    const text = request.body as string;

    // TODO: !!! Validate text content against offensive words, sensitive content etc.

    const voiceName = 'pavol';
    const voiceId = ELEVENLABS_VOICE_IDS[voiceName /* <- TODO: !!! Ennhance pavol voice */];

    if (ELEVENLABS_API_KEY === undefined || voiceId === undefined) {
        return response.status(500).json(
            {
                message: spaceTrim(`
                    There is a problem with the server configuration of text-to-speech

                    If the problem persists, please contact the server administrator on ${ADMIN_EMAIL}
                `),
            } as any /* <-[🌋] */,
        );
    }

    const speechPath = join(AUDIO_MATERIALIZE_DIR, voiceName, normalizeToKebabCase(text) + '.mp3');

    if (!(await isFileExisting(speechPath))) {
        // !!! Comment
        console.info(`Generating speech for text:\n\n${text}`);

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'audio/mpeg',
                'xi-api-key': ELEVENLABS_API_KEY,
            },
            body: JSON.stringify({
                model_id: 'eleven_multilingual_v2',
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

        // const speechResponseBlob = await speechResponse.blob();

        // TODO: !!! Put metadata to the audio file

        await mkdir(dirname(speechPath), { recursive: true });

        const fileStream = createWriteStream(speechPath, { flags: 'wx' });

        await finished(Readable.fromWeb(speechResponse.body as any /* <- TODO: Remove any */).pipe(fileStream));
        /*
        await new Promise((resolve, reject) => {
            speechResponse.body.pipe(fileStream);
            speechResponse.body.on('error', reject);
            fileStream.on('finish', resolve);
        });


        fileStream.close();
        */

        //await finished(Readable.fromWeb(speechResponse.body).pipe(fileStream));
        //await writeFile(voicePath, await blobToDataurl(speechResponseBlob), 'base64url');
    }

    response.setHeader('Content-Type', 'audio/mpeg').status(201);

    const speechContentStream = createReadStream(speechPath);
    speechContentStream.pipe(response);

    await finished(speechContentStream);

    return response.end();
}

/**
 * TODO: Maybe> response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
 */

/**
 * TODO: !!! Cleanup
 */
