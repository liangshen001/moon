import {GroupStatus} from '../enums/group-status';
import {GroupIdentityType} from '../enums/group-identity-type';

export interface UserGroup {
    id: number;
    groupId: number;
    groupStatus: GroupStatus;
    des?: string;
    groupGroupingId: number;
    addTime?: number;
    receive: boolean;
    groupIdentityType: GroupIdentityType;
    level: number;
    memberId: number;
    remark?: string;
}
