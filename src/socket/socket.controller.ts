import { Controller, Get } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';

@Controller('socket')
export class SocketController {
    constructor(private socketGateway: SocketGateway) {}

    @Get()
    getHello() {
        this.socketGateway.sendMessage('message');

        return {};
    }
}
