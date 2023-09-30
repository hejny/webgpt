module.exports = {
    apps: [
        {
            name: 'ptp-server',
            namespace: '1-2i',
            script: 'ptp-server/server.bash',
            exec_mode: 'fork',
            interpreter: 'bash',

            // TODO: !!! Cleanup:
            //interpreter: 'node',
            //interpreter_args: '-r ts-node/register',
            // interpreter: 'ts-node',
            // interpreter: 'node@16.20.2',
        },
    ],
};
