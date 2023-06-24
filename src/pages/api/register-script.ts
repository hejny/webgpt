import type { NextApiRequest, NextApiResponse } from 'next';
import { spaceTrim } from 'spacetrim';
import { NEXT_PUBLIC_URL } from '../../../config';

async function register() {
    console.info(`🔌 Registering your page`);

    console.info('hostname', window.location.hostname);
    console.info('host', window.location.host);

    const response = await fetch(`${NEXT_PUBLIC_URL.href}/api/register`, {
        method: 'POST',
        body: JSON.stringify({ host: window.location.host }),
    });
    const { message } = (await response.json()) as any;

    console.info(`🔌`, { message });
}

export default async function registerScriptHandler(request: NextApiRequest, response: NextApiResponse) {
    // !!! Remove !!! const registerScript = await readFile(join(__dirname, 'register-script.js.txt') /* <- TODO: Cache */, 'utf8');

    return response
        .status(200)
        .setHeader('content-type', 'text/javascript')
        .end(
            spaceTrim(
                // !!! Add note + remove register-script.js.txt
                (block) => `
            
                    const NEXT_PUBLIC_URL = new URL('${NEXT_PUBLIC_URL.href}');

                    /* not await */ register();
        
                    ${block(register.toString())}
                `,
            ),
        );
}

/**
 * TODO: Maybe prettify
 */
