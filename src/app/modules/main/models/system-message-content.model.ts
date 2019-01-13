import {SystemMessageType} from '../enums/system-message-type';
import {User} from '../../../models/user.model';


export class SystemMessageContentModel {
    constructor(public systemMessageType: SystemMessageType,
                public sender: User) {}
            
}