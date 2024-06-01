import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';
import { DirectMessageModule } from './direct-message/direct-message.module';
import { ConversationModule } from './conversation/conversation.module';

@Module({
  imports: [GatewayModule, DirectMessageModule, ConversationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
