import { Module } from '@nestjs/common';
import { MyGateway } from './gateway';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [MyGateway],
  exports: [MyGateway],
})
export class GatewayModule {}
