import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}
  async findMessagesAfterCursor(
    conversationId: string,
    cursor: Date | null,
    pageSize: number,
  ) {
    console.log(
      '🚀 ~ file: conversation.service.ts:12 ~ ConversationService ~ cursor:',
      cursor,
    );
    const where = {
      conversationId,
      createdAt: cursor ? { lt: cursor } : undefined,
    };

    const messages = await this.prisma.directMessage.findMany({
      where,
      take: pageSize,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return messages;
  }
  async getOrCreateConversation(userOneId: number, userTwoId: number) {
    const userId1 = Math.min(userOneId, userTwoId);
    const userId2 = Math.max(userOneId, userTwoId);
    //do this to make sure that the conversation is unique,
    // no matter which user is userOne or userTwo
    const conversation = await this.prisma.conversation.findUnique({
      where: {
        userOneId_userTwoId: {
          userOneId: userId1,
          userTwoId: userId2,
        },
      },
    });

    if (conversation) return conversation;

    return await this.prisma.conversation.create({
      data: {
        id: `${userId1}-${userId2}`,
        userOneId: userId1,
        userTwoId: userId2,
      },
    });
  }
  async getConversationsAfterCursor(
    userId: number,
    cursor: any,
    pageSize: number,
  ) {
    const conversations = await this.prisma.conversation.findMany({
      where: {
        OR: [{ userOneId: userId }, { userTwoId: userId }],
        lastMessageAt: cursor ? { lt: cursor } : undefined,
      },
      orderBy: {
        lastMessageAt: 'desc', // order conversations by the latest message timestamp
      },
      include: {
        userOne: true,
        userTwo: true,
      },
      take: pageSize,
    });

    // After fetching the conversations, map over them to include only the user that matches the userId.
    const modifiedConversations = conversations.map((conv) => {
      // Determine the user (either userOne or userTwo) that matches the userId.

      // Delete userOne and userTwo properties from the conversation object.

      // Return the modified conversation object with the new user property.
      return {
        ...conv,
      };
    });

    return {
      conversations: modifiedConversations,
    };
  }
}
