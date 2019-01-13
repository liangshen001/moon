import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonResponseModel} from '../../../models/common-response.model';
import {map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {UserFriend} from '../models/user-friend.model';

@Injectable()
export class UserFriendService {
    constructor(private http: HttpClient) {}
    urlResources = environment.getHttpUrl('v1/userFriends');


    addAsFriends(friendId: number, friendGroupingId: number) {
        return this.http.post<CommonResponseModel<UserFriend>>(this.urlResources, {
            friendId, friendGroupingId
        }, {withCredentials: true}).pipe(map(res => res.data));
    }

    loadUserFriends() {
        return this.http.get<CommonResponseModel<UserFriend[]>>(this.urlResources, {withCredentials: true})
            .pipe(map(res => res.data));
    }

    deleteFriends(id: number) {
        return this.http.delete<CommonResponseModel<UserFriend>>(`${this.urlResources}/${id}`, {withCredentials: true})
            .pipe(map(res => res.data));
    }

    updateUserFriend(id: number, body: {
        shield?: boolean,
        stealth?: boolean,
        friendGroupingId?: number,
        visible?: boolean,
        remark?: string
    }) {
        return this.http.patch<CommonResponseModel<UserFriend>>(`${this.urlResources}/${id}`, body,
            {withCredentials: true});
    }
}
