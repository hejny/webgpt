import type { NextApiRequest, NextApiResponse } from 'next';

interface RegisterResponse {
    message: string;
}

export default async function wallpapersHandler(request: NextApiRequest, response: NextApiResponse<RegisterResponse>) {
    response.status(200).json({ message: 'Test' });
}
