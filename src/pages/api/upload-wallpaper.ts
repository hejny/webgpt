import formidable from 'formidable';
import { readFile } from 'fs/promises';
import type { NextApiRequest, NextApiResponse } from 'next';
import { CDN } from '../../../config';
import { imageToText } from '../../ai/image-to-text/imageToText';
import { generateUserWallpaperCdnKey } from '../../utils/cdn/utils/generateUserWallpaperCdnKey';

import { string_description, string_url } from '../../utils/typeAliases';

export interface UploadWallpaperResponse {
    // TODO: [🌋] ErrorableResponse
    wallpaperUrl: string_url;
    wallpaperDescription: string_description;
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

    const files = await new Promise<formidable.Files>((resolve, reject) => {
        const form = formidable({});
        form.parse(request, (error, fields, files) => {
            if (error) {
                return reject(error);
            }
            return resolve(files);
        });
    });

    const wallpapers = files.wallpaper;

    if (!wallpapers || wallpapers.length !== 1) {
        return response
            .status(400)
            .json({ message: 'In form data there is not EXACTLY one "wallpapers" field' } as any);
    }

    const wallpaper = wallpapers[0]!;

    if (!wallpaper.mimetype?.startsWith('image/')) {
        return response.status(400).json({ message: 'Only image files are allowed' } as any);
    }

    const wallpaperBuffer = await readFile(wallpaper.filepath);

    const key = generateUserWallpaperCdnKey(wallpaperBuffer);
    await CDN.setItem(key, {
        type: wallpaper.mimetype,
        data: wallpaperBuffer,
    });

    const wallpaperUrl = CDN.getItemUrl(key);

    const wallpaperDescription = await imageToText(wallpaperUrl);

    return response
        .status(201)
        .json({ wallpaperUrl: wallpaperUrl.href, wallpaperDescription } satisfies UploadWallpaperResponse);
}

/**
 * TODO: [💁‍♂️] Analyze and upload in parallel + maybe compute colorstats in here?
 * TODO: [🧠] Compress/normalize the image
 * TODO: convert to png ([🧠] or maybe keep jpg)
 * TODO: !! Allow other image formats
 */
