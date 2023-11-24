import formidable from 'formidable';
import { readFile } from 'fs/promises';
import type { NextApiRequest, NextApiResponse } from 'next';
import { CDN } from '../../../config';
import { generateUserWallpaperCdnKey } from '../../utils/cdn/utils/generateUserWallpaperCdnKey';
import { string_url } from '../../utils/typeAliases';

export interface UploadWallpaperResponse {
    /**
     * URL of the wallpaper in our CDN
     */
    readonly wallpaperUrl: string_url;
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

    try {
        const wallpaperBuffer = await readFile(wallpaper.filepath);

        const key = generateUserWallpaperCdnKey(wallpaperBuffer);
        await CDN.setItem(key, {
            type: wallpaper.mimetype,
            data: wallpaperBuffer,
        });

        const wallpaperUrl = CDN.getItemUrl(key);

        return response.status(201).json({
            wallpaperUrl: wallpaperUrl.href,
        } satisfies UploadWallpaperResponse);
    } catch (error) {
        if (!(error instanceof Error)) {
            throw error;
        }

        console.error(error);
        return response.status(500).json({
            message: error.message /* <- TODO: [🈵] Is it good practise to reveal all error messages to client? */,
        } as any);
    }
}

/**
 * TODO: [🃏] Pass here some security token to prevent DDoS
 * TODO: [🧔] !! Check that uploaded image is not bigger that WALLPAPER_IMAGE_MAX_ALLOWED_SIZE + check file size and aspect ratio
 * TODO: [🧠] Compress/normalize the image
 * TODO: convert to png ([🧠] or maybe keep jpg)
 * TODO: !! Allow other image formats
 */
