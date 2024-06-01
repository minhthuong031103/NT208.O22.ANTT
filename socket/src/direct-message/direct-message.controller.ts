import { Body, Controller, Post, Req } from '@nestjs/common';
import { DirectMessageService } from './direct-message.service';
import { Request } from 'express';

@Controller('directMessage')
export class DirectMessageController {
  constructor(private directMessageService: DirectMessageService) {}

  @Post('sendMessage')
  async sendMessage(@Body() data: any, @Req() req: Request) {
    return this.directMessageService.sendMessage(data);
  }
}
