import type { NextApiRequest, NextApiResponse } from 'next';
import { spaceTrim } from 'spacetrim';
import { forTime } from 'waitasecond';
import { prettifyJavascript } from '../../../export/utils/prettifyJavascript';

function syncFunction() {
    console.info('1️⃣ syncFunction');
}

async function asyncFunction() {
    console.info('1️⃣ asyncFunction');
    await forTime(10);
    console.info('2️⃣ syncFunction');
}

async function asyncFunctionWithoutAsyncStuff() {
    console.info('1️⃣ asyncFunctionWithoutAsyncStuff');
}

export default async function asyncCompilationExperimentHandler(request: NextApiRequest, response: NextApiResponse) {
    return response
        .status(200)
        .setHeader('content-type', 'text/javascript')
        .end(
            prettifyJavascript(
                spaceTrim(
                    (block) => `

                        // syncFunction
                        ${block(syncFunction.toString())}

                        // asyncFunction
                        ${block(asyncFunction.toString())}

                        // asyncFunctionWithoutAsyncStuff
                        ${block(asyncFunctionWithoutAsyncStuff.toString())}
                    
                    `,
                ),
            ),
        );
}
