import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { PrismaService } from '../prisma/prisma.service';

// DTO
export class CreateConversationDto {
  userOneId: number;
  userTwoId: number;
}

@Controller('conversations')
export class ConversationController {
  constructor(
    private readonly conversationService: ConversationService,
    private prisma: PrismaService,
  ) {}

  @Post()
  async getOrCreateConversation(@Body() dto: CreateConversationDto) {
    const conversation = await this.conversationService.getOrCreateConversation(
      dto.userOneId,
      dto.userTwoId,
    );
    return { conversationId: conversation.id };
  }

  @Get('messages')
  async getMessages(
    @Query('conversationId') conversationId: string,
    @Query('cursor') cursor: string,
    @Query('pageSize') pageSize,
  ) {
    console.log(
      '🚀 ~ file: conversation.controller.ts:33 ~ ConversationController ~ cursor:',
      cursor,
    );
    const cursorDate = cursor !== 'undefined' ? new Date(cursor) : null; // '2021-08-03T09:00:00.000Z
    console.log(
      '🚀 ~ file: conversation.controller.ts:38 ~ ConversationController ~ cursorDate:',
      cursorDate,
    );
    // const pageSize = 10; // or any other number you prefer
    const messages = await this.conversationService.findMessagesAfterCursor(
      conversationId,
      cursorDate,
      parseInt(pageSize),
    );
    const nextCursor = messages.length
      ? messages[messages.length - 1].createdAt.toISOString()
      : null;
    return {
      messages,
      nextCursor,
    };
  }

  @Get('/all')
  async getConversations(
    @Query('cursor') cursor: string,
    @Query('userId') userId: string,
    @Query('pageSize') pageSize: string,
  ) {
    console.log('userId', userId);
    const cursorDate = cursor !== 'undefined' ? new Date(cursor) : null; // '2021-08-03T09:00:00.000Z

    const { conversations } =
      await this.conversationService.getConversationsAfterCursor(
        parseInt(userId),
        cursorDate,
        parseInt(pageSize),
      );
    const nextCursor = conversations.length
      ? conversations[conversations.length - 1].lastMessageAt.toISOString()
      : null;

    return {
      conversations,
      nextCursor,
    };
  }

  @Get('/onlineUsers')
  async getOnlineUsers() {
    const onlineUsers = await this.prisma.user.findMany({
      where: { isOnline: true },
    });
    console.log('onlineUsers', onlineUsers);
    return onlineUsers;
  }
}
