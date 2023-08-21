import { writeFile } from 'fs/promises';
import type { NextApiRequest, NextApiResponse } from 'next';
import { join } from 'path';

import { CDN } from '../../../config';
import { generateUserWallpaperCdnKey } from '../../utils/cdn/utils/generateUserWallpaperCdnKey';
import { string_mime_type, string_url } from '../../utils/typeAliases';

export interface UploadWallpaperResponse {
    // TODO: [🌋] ErrorableResponse
    wallpaperUrl: string_url;
}

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function uploadWallpaperHandler(
    request: NextApiRequest,
    response: NextApiResponse<UploadWallpaperResponse>,
) {
    if (request.method !== 'POST') {
        return response.status(400).json({ message: 'Only POST method is allowed' } as any);
    }

    console.log('request.headers', request.headers);
    const wallpaperAsBlob1 = new Blob([request.body], { type: request.headers['content-type'] as string_mime_type });
    const wallpaperAsBlob2 = request.read();

    request.on('readable', async () => {
        const data = request.read();

        console.log('data', data);

        await writeFile(join(process.cwd(), 'test-data.jpg'), data).catch(() => {});
        await writeFile(join(process.cwd(), 'test-data-binary.jpg'), data, 'binary').catch(() => {});
        await writeFile(join(process.cwd(), 'test-data-ascii.jpg'), data, 'ascii').catch(() => {});
        await writeFile(join(process.cwd(), 'test-data-utf8.jpg'), data, 'utf8').catch(() => {});

        const datablob = new Blob([data], { type: request.headers['content-type'] as string_mime_type });
        console.log('datablob', datablob);

        await writeFile(join(process.cwd(), 'test-datablob.jpg'), data).catch(() => {});
        await writeFile(join(process.cwd(), 'test-datablob-binary.jpg'), data, 'binary').catch(() => {});
        await writeFile(join(process.cwd(), 'test-datablob-ascii.jpg'), data, 'ascii').catch(() => {});
        await writeFile(join(process.cwd(), 'test-datablob-utf8.jpg'), data, 'utf8').catch(() => {});
    });

    console.log({ wallpaperAsBlob1, wallpaperAsBlob2 });

    const wallpaperAsBlob = wallpaperAsBlob1;

    if (!wallpaperAsBlob.type.startsWith('image/')) {
        return response.status(400).json({ message: 'Only image files are allowed' } as any);
    }

    const wallpaperAsbuffer = Buffer.from(await wallpaperAsBlob.arrayBuffer());

    // save file to disk
    await writeFile(join(process.cwd(), 'test-buffer.jpg'), wallpaperAsbuffer);
    // writeFile(join(process.cwd(),'test-file.jpg'), wallpaperAsBlob1);
    await writeFile(join(process.cwd(), 'test-body.jpg'), request.body);
    await writeFile(join(process.cwd(), 'test-body-binary.jpg'), request.body, 'binary');
    await writeFile(join(process.cwd(), 'test-body-ascii.jpg'), request.body, 'ascii');
    await writeFile(join(process.cwd(), 'test-body-utf8.jpg'), request.body, 'utf8');

    const key = generateUserWallpaperCdnKey(request.body);
    await CDN.setItem(key, {
        type: wallpaperAsBlob.type,
        data: request.body,
    });

    const wallpaperUrl = CDN.getItemUrl(key).href;
    console.log({ wallpaperUrl });

    return response.status(201).json({ wallpaperUrl } satisfies UploadWallpaperResponse);
}

/**
 * TODO: [🧠] Compress/normalize the image
 * TODO: convert to png ([🧠] or maybe keep jpg)
 * TODO: !!! Allow other image formats
 */
