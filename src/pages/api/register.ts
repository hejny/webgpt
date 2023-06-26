import type { NextApiRequest, NextApiResponse } from 'next';

interface RegisterResponse {
    // !!!
    message: string;
}

export default async function registerHandler(request: NextApiRequest, response: NextApiResponse<RegisterResponse>) {
    const allUsers = await prisma.user.findMany();
    return response.status(200).json({ message: '[🔌] Test', allUsers });



    // !!!!!!!!!! supabase.

    // TODO: !!!! Add register logic
}
