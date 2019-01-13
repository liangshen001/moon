import {ChatMessage} from './chat-message.model';


export interface FriendMessage extends ChatMessage {
    receiverId: number;
}
