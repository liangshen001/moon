import {ChatMessage} from './chat-message.model';


export interface GroupMessage extends ChatMessage {
    groupId: number;
}