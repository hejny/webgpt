import formidable from 'formidable';
import { readFile } from 'fs/promises';
import type { NextApiRequest, NextApiResponse } from 'next';
import { string_url } from '../../utils/typeAliases';

export interface PublishWebsiteResponse {
    // TODO: [🌋] ErrorableResponse
    readonly websiteUrl: string_url;
}

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function publishWebsiteHandler(
    request: NextApiRequest,
    response: NextApiResponse<PublishWebsiteResponse>,
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

    const websitePackageArray = files.website;

    if (!websitePackageArray || websitePackageArray.length !== 1) {
        return response.status(400).json({ message: 'In form data there is not EXACTLY one "website" field' } as any);
    }

    const websitePackage = websitePackageArray[0]!;

    if (!websitePackage.mimetype?.startsWith('application/x-tar')) {
        return response.status(400).json({ message: 'Only tar files are allowed' } as any);
    }

    try {
        const websitePackageBuffer = await readFile(websitePackage.filepath);

        // TODO: !!! Implement

        return response.status(201).json({
            websiteUrl: `!!!`,
        } satisfies PublishWebsiteResponse);
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
 * TODO: [🧔] !! Check that uploaded website is not bigger that WEBSITE_MAX_ALLOWED_SIZE + check file size and aspect ratio
 * TODO: [🧠] Check website package integrity
 * TODO: [🧠] Check website package for malicious stuff
 */
