import { ImageResponse } from '@vercel/og';
import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidUuid } from '../../utils/isValidUuid';

export const config = {
    runtime: 'experimental-edge',
};

export default async function ogImageHandler(request: NextApiRequest, response: NextApiResponse) {
    const wallpaperId = request.query.wallpaperId;

    if (!isValidUuid(wallpaperId)) {
        return response.status(400).json({ message: 'GET param wallpaperId is not valid UUID' });
    }

    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    fontSize: 128,
                    background: 'white',
                    width: '100%',
                    height: '100%',
                }}
            >
                Hello, World!
            </div>
        ),
    );
}
