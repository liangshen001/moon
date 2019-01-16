import {ChatType} from '../enums/chat-type';


export class SearchModel {
    constructor(public id: number,
                public imageUrl: string,
                public name: string,
                public type: ChatType,
                public key: string,
                public desc: number) {}
}