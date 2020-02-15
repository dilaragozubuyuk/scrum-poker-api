import { Controller, Get } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';

@Controller('socket')
export class SocketController {
    constructor(private socketGateway: SocketGateway) {}

    @Get()
    getHello() {
       // console.log('sss');
        this.socketGateway.sendMessage('aaaaaa');

        return {};
    }
}
