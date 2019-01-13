import {MessageType} from '../enums/message-type';


export class TextMessageWrapperModel<T> {
    constructor(private messageType: MessageType,
                private messageContent: T) {}
}
