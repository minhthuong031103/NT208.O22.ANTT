import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { randomUUID } from 'crypto';
import { Server } from 'socket.io';
import { PrismaService } from '../prisma/prisma.service';
import { ConnectedSocket } from '@nestjs/websockets';
import { userInfo } from 'os';
import * as moment from 'moment-timezone';
//Tạo gateway
@WebSocketGateway({
  namespace: 'socket', //namespace của server
  cors: {
    origin: true, // or true to allow any origin
    methods: ['GET', 'POST'], // or add any other HTTP methods you are using
    credentials: true,
  },
})
export class MyGateway implements OnModuleInit {
  constructor(private prisma: PrismaService) {}
  @WebSocketServer() //Tạo một server socket
  server: Server;

  onModuleInit() {
    //server.on là một event listener, khi có một client connect tới server thì sẽ emit event connection, event connection (mặc định) này sẽ được server lắng nghe và thực hiện một hành động
    this.server.on('connection', (socket) => {
      const userId = parseInt(socket.handshake.query.userId as any);
      const conversationId = socket.handshake.query.conversationId;
      if (conversationId) {
        socket.join(conversationId);
      }
      console.log('userId:', userId);
      console.log(socket.id);
      console.log('Connected');

      socket.on('userConnected', async (user) => {
        console.log('userConnected ehhehehe');
        console.log(user);

        await this.prisma.user.update({
          where: { id: user.userId },
          data: {
            lastSeen: moment().tz('Asia/Ho_Chi_Minh').toDate(),
            isOnline: true,
          },
        });
        // if (!this.onlineUsers.has(user.userId)) {
        //   this.onlineUsers.add(user.userId);
        //   console.log('will emit onlineUsers add');
        //   this.server.emit('onlineUsers', Array.from(this.onlineUsers));
        // } else {
        //   this.onlineUsers.delete(user.userId);
        //   this.onlineUsers.add(user.userId);
        //   console.log('will emit onlineUsers');
        //   this.server.emit('onlineUsers', Array.from(this.onlineUsers));
        // }
      });
      //socket.emit => emit toi client so huu socket object
      //socket.broadcast.emit => emit toi tat ca cac client khac ngoai tru client so huu socket object
      //this.server.emit => emit toi tat ca cac client ke ca client so huu socket object
      socket.on('disconnect', async () => {
        console.log(socket.id);
        console.log('Disconnected');
        // Assuming you have a way to get userId from socket object
        //userId is string
        await this.prisma.user.update({
          where: { id: userId },
          data: {
            lastSeen: moment().tz('Asia/Ho_Chi_Minh').toDate(),
            isOnline: false,
          },
        });

        console.log('will emit onlineUsers (leave)', typeof userId);
      });
    });
  }
  //subcribe message dựa trên tên event mà client emit tới server
  @SubscribeMessage('newMessage')
  async onNewMessage(@MessageBody() body: any, @ConnectedSocket() socket: any) {
    try {
      console.log(body);
      // Store the message in the database
      const now = new Date();

      // To adjust for a different timezone, you can manually add the timezone offset
      // Vietnam is UTC+7, so add 7 hours (in milliseconds)

      const newMessageData = {
        id: randomUUID(),
        updatedAt: now,
        createdAt: now,
        content: body.content,
        userId: body.userId,
        conversationId: body.conversationId,
        fileUrl: body.fileUrl ? body.fileUrl : null,
      };
      const conversationUpdateData = {
        lastMessageAt: now,
        lastMessage: body.content,
      };
      const newMessage = await this.prisma.$transaction([
        this.prisma.directMessage.create({ data: newMessageData }),
        this.prisma.conversation.update({
          where: { id: body.conversationId },
          data: conversationUpdateData,
        }),
      ]);

      if (newMessage) {
        this.server.to(body.conversationId).emit('onMessage', {
          msg: 'New Message',
          content: newMessage[0], // sending the stored message
        });
      }

      //khi server nhận được newMessage event từ một client, nó sẽ emit lại 1 event onMessage tới tất cả
      //các client đang connect tới server
    } catch (e) {
      console.log(e);
    }
  }
}
