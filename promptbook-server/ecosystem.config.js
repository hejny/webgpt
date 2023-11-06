module.exports = {
    apps: [
        {
            name: 'ptbk-server',
            namespace: '1-2i',
            script: 'ptp-server/server.bash',
            exec_mode: 'fork',
            interpreter: 'bash',
        },
    ],
};
