import { Controller, Post, Res, Body, HttpStatus, Get, Param, NotFoundException} from '@nestjs/common';
import { AddSessionDTO } from 'src/dto/add-session.dto';
import { SessionService } from './session.service';
import { ValidateObjectId } from 'src/pipes/validation-object-id.pipe';

@Controller('')
export class SessionController {
    constructor(private sessionService: SessionService) {}

    @Post('/session')
    async addPost(@Res() res, @Body() addSessionDTO: AddSessionDTO) {
        const newSession = await this.sessionService.addSession(addSessionDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Session has been submitted successfully!',
            data: newSession,
        });
    }

    @Get('session/:sessionId')
    async getPost(@Res() res, @Param('sessionId', new ValidateObjectId()) sessionId) {
      const session = await this.sessionService.getSession(sessionId);
      if (!session) {
          throw new NotFoundException('Session does not exist!');
      }
      return res.status(HttpStatus.OK).json(session);
    }
}
