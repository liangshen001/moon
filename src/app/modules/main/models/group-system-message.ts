import {AddStatus} from '../enums/add-status';

export class GroupSystemMessage {
    id: number;

    groupId: number;

    inviterId: number;

    submitTime: number;

    agreeTime: number;

    status: AddStatus;

    userId: number;

}
