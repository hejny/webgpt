module.exports = {
    apps: [
        {
            name: 'promptbook',
            namespace: 'webgpt',
            script: './promptbook-server/server.bash',
            exec_mode: 'fork',
            interpreter: 'bash',
        },
        {
            name: 'promptimage',
            namespace: 'webgpt',
            script: './promptimage-server/server.bash',
            exec_mode: 'fork',
            interpreter: 'bash',
        },
    ],
};
