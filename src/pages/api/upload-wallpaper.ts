import { NextRequest, NextResponse } from 'next/server';
import { CDN } from '../../../config';
import { generateUserWallpaperCdnKey } from '../../utils/cdn/utils/generateUserWallpaperCdnKey';
import { string_url } from '../../utils/typeAliases';

interface UploadWallpaperResponse {
    wallpaperUrl: string_url;
}

export async function POST(request: NextRequest, response: NextResponse<UploadWallpaperResponse>) {
    const data = await request.formData();
    const file: File | null = data.get('wallpaper') as unknown as File;

    if (file.type !== 'image/png') {
        // TODO: !!! How this behaves in production?
        throw new Error('Only PNG files are allowed');
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const key = generateUserWallpaperCdnKey(buffer);
    await CDN.setItem(key, {
        type: file.type,
        data: buffer,
    });

    const wallpaperUrl = CDN.getItemUrl(key).href;

    // TODO: !!! Is this OK?
    // TODO: !!! Is this returning 201 - created?
    return { wallpaperUrl } satisfies UploadWallpaperResponse;
}

/**
 * TODO: !!! Allow other image formats - convert to png ([🧠] or maybe keep jpg)
 */
