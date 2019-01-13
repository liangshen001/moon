import {ChatType} from '../enums/chat-type';

export class ChatMessageContentModel {
    constructor(public chatId: number,
                public chatType: ChatType,
                public senderId: number,
                public sendTime: number,
                public content: string) {}
}
