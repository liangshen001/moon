import {AddStatus} from '../enums/add-status';
import {AddSourceType} from '../enums/add-source-type';

export class FriendValidation {
    id: number;

    applicantId: number;

    applyTime: number;

    agreeTime: number;

    userId: number;

    status: AddStatus;

    addSourceType: AddSourceType;
}
