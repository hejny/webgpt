module.exports = {
    apps: [
        {
            name: 'ptp-server',
            namespace: '1-2i',
            script: 'ptp-server/server.ts',
            exec_mode: 'cluster',
            interpreter: 'node@16.20.2',
        },
    ],
};
