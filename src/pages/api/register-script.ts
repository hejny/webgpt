import type { NextApiRequest, NextApiResponse } from 'next';
import { spaceTrim } from 'spacetrim';
import { NEXT_PUBLIC_URL } from '../../../config';
import { prettifyJavascript } from '../../export/utils/prettifyJavascript';
import { isValidUuid } from '../../utils/validators/isValidUuid';

async function register() {
    console.info('🔌', 'Registering your page');

    console.info('🔌', 'hostname', window.location.hostname);
    console.info('🔌', 'host', window.location.host);

    const response = await fetch(
        `${
            // @ts-ignore
            config.NEXT_PUBLIC_URL.href
        }/api/register?wallpaperId=${encodeURIComponent(window.location.toString())}&url=${encodeURIComponent(
            window.location.toString(),
        )}`,
        {
            method: 'PUT',
        },
    );
    const { message } = (await response.json()) as any;

    console.info('🔌', { message });
}

export default async function registerScriptHandler(request: NextApiRequest, response: NextApiResponse) {
    const wallpaperId = request.query.wallpaperId;

    if (!isValidUuid(wallpaperId)) {
        return response.status(400).json({ message: 'GET param wallpaperId is not valid UUID' });
    }

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
                            const wallpaperId = '${wallpaperId}';

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
