import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SocketController } from './socket.controller';

@Module({
    providers: [SocketGateway],
    controllers: [SocketController],
})
export class SocketModule {}
