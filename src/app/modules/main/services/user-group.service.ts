import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {CommonResponseModel} from '../../../models/common-response.model';
import {UserGroup} from '../models/user-group.model';
import {GroupStatus} from '../enums/group-status';
import {User} from '../../../models/user.model';
import {map} from 'rxjs/operators';

@Injectable()
export class UserGroupService {

    url = environment.getHttpUrl(`v1/userGroups`);

    constructor(private http: HttpClient) {}

    post(params: {
        inviteeIds: number[],
        groupId: number
    }) {
        return this.http.post<CommonResponseModel<UserGroup[]>>(this.url, {
            params,
            withCredentials: true
        }).pipe(
            map(res => res.data)
        );
    }

    loadUserGroups(groupId?: number) {
        const params = {};
        if (groupId) {
            params['groupId'] = `${groupId}`;
        }
        return this.http.get<CommonResponseModel<UserGroup[]>>(this.url, {
            params,
            withCredentials: true
        });
    }

    updateUserGroup(id: number, changes: {
        groupStatus?: GroupStatus;
        groupGroupingId?: number;
    }) {
        return this.http.patch<CommonResponseModel<UserGroup>>(`${this.url}/${id}`,
            changes, {withCredentials: true});
    }
}
