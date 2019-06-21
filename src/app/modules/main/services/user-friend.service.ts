import {Injectable} from '@angular/core';
import {HttpService} from '../../../services/http.service';

@Injectable()
export class UserFriendService {
    constructor(private http: HttpService) {}

    addAsFriends(body: {friendId: number, friendGroupingId: number}) {
        return this.http.postOfUser({
            apiBase: 'v1',
            resourceName: 'userFriends',
            body
        });
    }

    loadUserFriends() {
        return this.http.getOfUser({
            apiBase: 'v1',
            resourceName: 'userFriends'
        });
    }

    deleteFriends(resourceId: number) {
        return this.http.deleteOfUser({
            apiBase: 'v1',
            resourceName: 'userFriends',
            resourceId
        });
    }

    updateUserFriend(resourceId: number, body: {
        shield?: boolean,
        stealth?: boolean,
        friendGroupingId?: number,
        visible?: boolean,
        remark?: string
    }) {
        return this.http.patchOfUser({
            apiBase: 'v1',
            resourceName: 'userFriends',
            resourceId,
            body
        });
    }
}
