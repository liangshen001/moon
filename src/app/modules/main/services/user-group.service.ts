import {Injectable} from '@angular/core';
import {GroupStatus} from '../enums/group-status';
import {HttpService} from '../../../services/http.service';

@Injectable()
export class UserGroupService {


    constructor(private http: HttpService) {}

    post(body: {
        inviteeIds: number[],
        groupId: number
    }) {
        return this.http.postOfUser({
            apiBase: 'v1',
            resourceName: 'userGroups',
            body
        });
    }

    loadUserGroups(groupId?: number) {
        const params = {};
        if (groupId) {
            params['groupId'] = `${groupId}`;
        }
        return this.http.getOfUser({
            apiBase: 'v1',
            resourceName: 'userGroups',
            params
        });
    }

    updateUserGroup(resourceId: number, body: {
        groupStatus?: GroupStatus;
        groupGroupingId?: number;
    }) {
        return this.http.patchOfUser({
            apiBase: 'v1',
            resourceName: 'userGroups',
            resourceId,
            body
        });
    }
}
