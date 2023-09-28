#!/usr/bin/env ts-node

import { createRemoteServer } from '../src/ai/text-to-text/prompt-templates/lib/src/execution/plugins/remote/createRemoteServer';

createRemoteServer({
    port: 4455,
});

/**
 * TODO: Put this as a sample for @ptp/remote
 * TODO: [🃏] Pass here some security token to prevent DDoS
 */
