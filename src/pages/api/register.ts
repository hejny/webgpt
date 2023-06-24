import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

interface RegisterResponse {
    // !!!
    message: string;
    allUsers: any;
}

export default async function wallpapersHandler(request: NextApiRequest, response: NextApiResponse<RegisterResponse>) {
    const allUsers = await prisma.user.findMany();
    response.status(200).json({ message: 'Test', allUsers });
}
