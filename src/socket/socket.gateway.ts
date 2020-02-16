import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/session' })
export class SocketGateway {
    @WebSocketServer()
    server: Server;
    data = {};
    room = '';
    users = {};


    @SubscribeMessage('message')
    async getMessage(@MessageBody() data: string): Promise<string> {
        return data;
    }

    @SubscribeMessage('setUser')
    async setUser(client: Socket, room: string): Promise<any> {
        if (!this.users[room]) {
            this.users[room] = 0;
        }
    }

    @SubscribeMessage('point')
    async setPoint(client: Socket, data): Promise<any> {
        this.server.to(data.id).emit('point', {point: data.point, user: data.user});
    }

    async sendMessage(data: string) {
        this.server.emit('message', data);
    }


    @SubscribeMessage('joinRoom')
    async joinRoom(client: Socket, data: any): Promise<any> {

        this.users[data.id]++;
        if (this.users[data.id] <= data.maxUser) {
            client.join(data.id);
            this.server.to(data.id).emit('joined', { user: data.user, count: this.users[data.id] });
        }



    }

    @SubscribeMessage('leaveRoom')
    async leaveRoom(client: Socket, data: any): Promise<any> {
        client.leave(data.id);
        client.emit('leftRoom', data.user);
    }

}
