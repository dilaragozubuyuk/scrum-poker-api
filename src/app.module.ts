import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SocketModule } from './socket/socket.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://dilara:12341234@flatmate-0xzrn.mongodb.net/scrum-poker?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true}), SocketModule, SessionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
