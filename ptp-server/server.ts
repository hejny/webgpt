#!/usr/bin/env ts-node

import chalk from 'chalk';
import { Server as SocketIoServer, Socket } from 'socket.io';
import { Ptps_Request } from './interfaces/Ptps_Request';
import { Ptps_Response } from './interfaces/Ptps_Response';

const PORT = 4445;
// TODO: IS_VERBOSE

const server = new SocketIoServer(PORT, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

server.on('connection', (socketConnection: Socket) => {
    console.log(chalk.green(`Client connected: ${socketConnection.id}`));

    socketConnection.on('request', (options: Ptps_Request) => {
        const {} = options;
        console.log(chalk.green(`New request`), options);

        socketConnection.send('response', {} satisfies Ptps_Response);

        // TODO: !!! Also handle progress and errors
    });

    socketConnection.on('disconnect', () => {
        console.log(chalk.magenta(`Client disconnected: ${socketConnection.id}`));
    });
});

console.log(chalk.bgGreen(`Socket.io server listening on port ${PORT}`));
