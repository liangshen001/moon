export interface ChatMessage {
    id: number;
    senderId: number;
    content: string;
    sendTime: number;
    // 用户发送消息时 是否正在发送中 是否发送成功
    sending?: boolean;
    // 发送消息是否失败
    sendError?: boolean;
}
