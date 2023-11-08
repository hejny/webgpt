module.exports = {
    apps: [
        {
            name: 'ptbk-server',
            namespace: 'webgpt',
            script: 'promptbook-server/server.bash',
            exec_mode: 'fork',
            interpreter: 'bash',
        },
    ],
    apps: [
        {
            name: 'img-server',
            namespace: 'webgpt',
            script: 'promptimage-server/server.bash',
            exec_mode: 'fork',
            interpreter: 'bash',
        },
    ],
};
