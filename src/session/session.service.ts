import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session } from 'src/interfaces/session.interface';
import { AddSessionDTO } from 'src/dto/add-session.dto';
import { UpdateSessionDTO } from 'src/dto/update-session.dto';

@Injectable()
export class SessionService {
    constructor(@InjectModel('Session') private readonly sessionModel: Model<Session>) { }

    // async getTasks(): Promise<Task[]> {
    //     const tasks = await this.taskModel.find().exec();
    //     return tasks;
    // }

    async getSession(id): Promise<Session[]> {
        const session = await this.sessionModel.findById(id).exec();
        return session;
    }

    async addSession(addSessionDTO: AddSessionDTO): Promise<Session> {
        const newSession = await this.sessionModel(addSessionDTO);
        return newSession.save();
    }

    async editSession(addSessionDTO: UpdateSessionDTO): Promise<Session> {
        const editedSession = await this.sessionModel
          .findByIdAndUpdate(addSessionDTO._id, addSessionDTO, { new: true });
        return editedSession;
    }

    // async editTask(postID, createTaskDTO: CreateTaskDTO): Promise<Task> {
    //     const editedTask = await this.taskModel
    //       .findByIdAndUpdate(postID, createTaskDTO, { new: true });
    //     return editedTask;
    //   }
}
