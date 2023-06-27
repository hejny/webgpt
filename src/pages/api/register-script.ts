import type { NextApiRequest, NextApiResponse } from 'next';
import { spaceTrim } from 'spacetrim';
import { NEXT_PUBLIC_URL } from '../../../config';
import { prettifyJavascript } from '../../export/utils/prettifyJavascript';

async function register() {
    console.info('🔌', 'Registering your page');

    console.info('🔌', 'hostname', window.location.hostname);
    console.info('🔌', 'host', window.location.host);


    // !!!!!!!!!!!!!!! supabase or register logic
    const response = await fetch(
        `${
            // @ts-ignore
            config.NEXT_PUBLIC_URL.href
        }/api/register`,
        {
            method: 'POST',
            body: JSON.stringify({ host: window.location.host }),
        },
    );
    const { message } = (await response.json()) as any;

    console.info('🔌', { message });
}

export default async function registerScriptHandler(request: NextApiRequest, response: NextApiResponse) {
    return response
        .status(200)
        .setHeader('content-type', 'text/javascript')
        .end(
            prettifyJavascript(
                spaceTrim(
                    // !!! Add note
                    (block) => `

                        /**
                         * Note: [🔌]
                         **/

                        (()=>{

                            const config = { NEXT_PUBLIC_URL: '${NEXT_PUBLIC_URL.href}' };

                            /* not await */ register();

                            ${block(register.toString())}

                        })();

                    `,
                ),
            ),
        );
}

/**
 * TODO: Maybe prettify
 */
