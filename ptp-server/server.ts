#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

import { createRemoteServer } from '../src/ai/text-to-text/prompt-templates/lib/src/execution/plugins/remote/createRemoteServer';

createRemoteServer({
    port: 4445,
});

/**
 * TODO: Put this as a sample for @ptp/remote
 * TODO: [🃏] Pass here some security token to prevent DDoS
 */
