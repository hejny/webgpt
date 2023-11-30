import type { NextApiRequest, NextApiResponse } from 'next';
import { spaceTrim } from 'spacetrim';
import { NEXT_PUBLIC_URL } from '../../../config';
import { prettifyJavascript } from '../../export/utils/prettifyJavascript';
import { uuid } from '../../utils/typeAliases';
import { isValidWallpaperId } from '../../utils/validators/isValidWallpaperId';

/**
 * Function for registering new site into the system
 * It is injected into the response of registerScriptHandler as a string
 */
async function register(wallpaperId: uuid) {
    console.info('🔌', 'Registering your page');
    console.info('🔌', 'hostname', window.location.hostname);
    console.info('🔌', 'host', window.location.host);

    const response = await fetch(
        `${
            // @ts-ignore
            config.NEXT_PUBLIC_URL
        }api/register?wallpaperId=${wallpaperId}&url=${encodeURIComponent(window.location.toString())}`,
        {
            method: 'PUT',
        },
    );
    const { message } = (await response.json()) as any;

    console.info('🔌', message);
}

/**
 * API endpoint handler to return javascript for registering new site into the system
 */
export default async function registerScriptHandler(
    request: NextApiRequest,
    response: NextApiResponse /* <- TODO: [❄] What is the best way how to type non-json reposnses */,
) {
    const wallpaperId = request.query.wallpaperId;

    if (!isValidWallpaperId(wallpaperId)) {
        return response.status(400).json({
            message: 'GET param wallpaperId is not valid UUID' /* <- TODO: [🌻] Unite wrong GET param message */,
        });
    }

    return response
        .status(200)
        .setHeader('content-type', 'text/javascript')
        .end(
            prettifyJavascript(
                spaceTrim(
                    (block) => `

                        /**
                         * Note: [🔌] This script will register your page ${
                             NEXT_PUBLIC_URL.href
                         } into the WebGPT database of sites
                         **/

                        (()=>{
                            
                            const config = { NEXT_PUBLIC_URL: '${NEXT_PUBLIC_URL.href}' };

                            /* not await */ register('${wallpaperId}');
                
                            ${block(register.toString())}

                        })();
                    
                    `,
                ),
            ),
        );
}
