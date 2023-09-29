module.exports = {
    apps: [
        {
            name: 'ptp-server',
            namespace: '1-2i',
            script: 'ptp-server/server.ts',
            exec_mode: 'cluster',
        },
    ],
};
