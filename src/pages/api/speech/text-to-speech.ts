// import ElevenLabs from 'elevenlabs-node'; <- TODO: !!! Use OR uninstall
//[🧆]> import { createReadStream } from 'fs';
import chalk from 'chalk';
import type { NextApiRequest, NextApiResponse } from 'next';
// !!! import fetch from 'node-fetch';
import { join } from 'path';
import spaceTrim from 'spacetrim';
//[🧆]> import { finished } from 'stream/promises';
import { ADMIN_EMAIL, CDN, ELEVENLABS_API_KEY, ELEVENLABS_VOICE_IDS } from '../../../../config';
import { getSpeechCdnKey } from '../../../utils/cdn/utils/getSpeechCdnKey';
import { isValidClientId } from '../../../utils/validators/isValidClientId';
//[🧆]> import { mkdir } from 'fs/promises';
//[🧆]> import { isFileExisting } from '../../../../scripts/utils/isFileExisting';

// TODO: !!! To config + !!! Note NOT cache dir
const SPEECH_MATERIALIZE_DIR = join(process.cwd(), 'speech');

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

    // TODO: !!! [🧠] Better way how to deepen the directory structure
    const speechCdnKey = getSpeechCdnKey(voiceName, text);
    //[🧆]> const speechPath = join(SPEECH_MATERIALIZE_DIR, speechCdnKey);

    if (/* //[🧆]> !(await isFileExisting(speechPath)) && */ !(await CDN.getItem(speechCdnKey))) {
        // !!! Comment
        console.info(chalk.bgCyan(`Generating speech for text:`) + `\n\n` + chalk.cyan(text));

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

        // TODO: !!! Put metadata to the audio file

        /*
        //[🧆]> await mkdir(dirname(speechPath), { recursive: true });
        //[🧆]> const fileStream = createWriteStream(speechPath, { flags: 'wx' });
        //[🧆]> await finished(Readable.fromWeb(speechResponse.body as any /* <- TODO: Remove any * /).pipe(fileStream));
        */

        // TODO: [🥪] Make util responseToBuffer
        const speechResponseArrayBuffer = await speechResponse.arrayBuffer();
        const speechResponseBuffer = Buffer.from(speechResponseArrayBuffer);

        await CDN.setItem(speechCdnKey, {
            type: 'audio/mpeg',
            data: speechResponseBuffer,
        });
    }

    /*
    //[🧆]> response.setHeader('Content-Type', 'audio/mpeg').status(201);
    //[🧆]> const speechContentStream = createReadStream(speechPath);
    //[🧆]> speechContentStream.pipe(response);
    //[🧆]> await finished(speechContentStream);
    //[🧆]> response.end();
    */

    const speechContentItem = (await CDN.getItem(speechCdnKey))!;
    response.setHeader('Content-Type', speechContentItem.type);
    response.status(201);
    response.end(speechContentItem.data);

    // TODO: !!! ACRY> API handler should not return a value, received object.
}

/**
 * TODO: Maybe> response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
 */

/**
 * TODO: !!! Cleanup
 * TODO: [🧆] Save both in CDN and commited cache (and figure out the system how to make some system for it reusable elsewhere)
 */
