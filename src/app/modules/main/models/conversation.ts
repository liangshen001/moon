import {ChatType} from '../enums/chat-type';


export interface Conversation {
    id: number;
    chatId: number;
    chatType: ChatType;
    senderId: number;
    sendTime: number;
    content: string;
    unreadCount: number;
    top?: boolean;
}
