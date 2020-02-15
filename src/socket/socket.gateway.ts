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

    // constructor() {
    //     this.server.on('connection', () => {
    //         console.log('connected');
    //     });
    // }

    // @SubscribeMessage('events')
    // findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    //     return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
    // }

    @SubscribeMessage('message')
    async getMessage(@MessageBody() data: string): Promise<string> {
        console.log(data);
        return data;
    }

    @SubscribeMessage('setUser')
    async setUser(client: Socket, room: string): Promise<any> {
        console.log('setUser', room, this.users);
        if (!this.users[room]) {
            this.users[room] = 0;
        }
    }

    async sendMessage(data: string) {
        this.server.emit('message', data);
    }

    // async sendUserInfo() {
    //     this.users++;
    //     this.server.emit('users', this.users);
    // }

    @SubscribeMessage('joinRoom')
    async joinRoom(client: Socket, room: string): Promise<any> {
        client.join(room);
        this.room = room;
        this.users[room]++;
        console.log(this.users[room]);
        client.on(room, (data) => {
            console.log('connected to room');
            if (data.point) {
                this.server.to(room).emit('point', data.point);
            }
        });

        // client.on('joined', (data) => {
        //     console.log('connected to room');
        //     if (data.point) {
        //         this.server.to(room).emit('point', data.point);
        //     }
        // });

        //this.users++;
        //this.server.to(room).emit('users', this.users);
        this.server.to(room).emit('joined', this.users[room]);
        //this.server.to(room).emit(room, 'bbbb');

        // console.log(roomName);
        // this.server.on(roomName, () => {
        //    console.log('connected to room');
        // });
        // this.sendUserInfo();
    }

    @SubscribeMessage('leaveRoom')
    async leaveRoom(client: Socket, room: string): Promise<any> {
        client.leave(room);
        client.emit('leftRoom', room);
        // console.log(roomName);
        // this.server.on(roomName, () => {
        //    console.log('connected to room');
        // });
    }

}
