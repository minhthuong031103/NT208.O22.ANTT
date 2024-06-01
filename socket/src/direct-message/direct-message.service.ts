import { Injectable } from '@nestjs/common';
import { MyGateway } from '../gateway/gateway';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DirectMessageService {
  constructor(private prisma: PrismaService, private socket: MyGateway) {}

  async sendMessage(data: any) {
    this.socket.server.emit(
      `chat:${'5a84bf0e-2e29-4a75-981e-03f32bef41bc'}:messages`,
      data,
    );
    console.log(data);
    return 'ok nha';
  }
}
